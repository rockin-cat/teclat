// Contour cards ("girs melòdics"): a card the game draws itself, one arrow per
// beat, read with the SCALE of the key rather than the notes of the chord.
//
//   ●  start on a note of the bar's chord (any of them)
//   ↑  one note of the scale up        ↓  one note down
//   ⇈  skip a note up (a third)         ⇊  skip a note down
//   →  the same note again              ○  silence
//
// A card is named "contour:●↑↓↑" and built on the fly by `contourCard`, so a
// mission can ask for any shape without a picture in the catalogue.

import { parseChord, pitchClass, mod } from './theory.js';
import { parseKey } from './degrees.js';

export const SYMBOLS = {
  '●': { id: 'start', step: null, text: 'comença en una nota de l\'acord' },
  '↑': { id: 'up', step: 1, text: 'una nota amunt' },
  '↓': { id: 'down', step: -1, text: 'una nota avall' },
  '⇈': { id: 'up2', step: 2, text: 'salta una nota amunt' },
  '⇊': { id: 'down2', step: -2, text: 'salta una nota avall' },
  '→': { id: 'same', step: 0, text: 'la mateixa nota' },
  '○': { id: 'rest', step: null, text: 'silenci' },
};

const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const MINOR = [0, 2, 3, 5, 7, 8, 10];

export const isContourName = (name) => typeof name === 'string' && name.startsWith('contour:');

/** The pitch classes of the scale of `key` ("C", "Am", "F#m"…), from the tonic. */
export function scaleOf(key = 'C') {
  const { tonic, minor } = parseKey(key);
  return (minor ? MINOR : MAJOR).map((s) => mod(tonic + s, 12));
}

/** Position of a MIDI note on the ladder of the scale (octaves × 7 + degree), or null when it is not in the scale. */
export function degreeOf(note, scale) {
  const i = scale.indexOf(pitchClass(note));
  if (i === -1) return null;
  return Math.floor(note / 12) * 7 + i;
}

/** The MIDI note `steps` scale-steps away from `from` (both in the scale). */
export function stepFrom(from, steps, scale) {
  const d = degreeOf(from, scale);
  if (d === null) return null;
  const target = d + steps;
  const octave = Math.floor(target / 7);
  const i = mod(target, 7);
  return octave * 12 + scale[i];
}

/**
 * The card object for a code like "●↑↓↑" (4 symbols, one per beat; 3 in 3/4).
 * It has the same fields the score and the judge expect of a rhythmic card
 * (pattern, subdivisions, layout cells), plus `symbols`.
 */
export function contourCard(code) {
  const chars = [...code.replace(/\s+/g, '')].filter((ch) => SYMBOLS[ch]);
  if (!chars.length) throw new Error(`Carta de contorn buida: "${code}"`);
  const n = chars.length;
  const pad = 0.07;
  const slot = (1 - 2 * pad) / n;
  return {
    type: 'contour',
    filename: `contour:${chars.join('')}`,
    code: chars.join(''),
    symbols: chars.map((ch) => SYMBOLS[ch].id),
    chars,
    meter: 'binary',
    number: 0,
    notes: chars.filter((ch) => ch !== '○').length,
    pattern: chars.map((ch) => [ch === '○' ? 0 : 1]),
    subdivisions_per_beat: chars.map(() => 1),
    tier: chars.some((ch) => ch === '⇈' || ch === '⇊') ? 'medium' : 'easy',
    layout: {
      y: 0.5,
      radius: Math.min(0.0857, slot * 0.36),
      cells: chars.map((_, i) => ({ x0: pad + i * slot + slot * 0.08, x1: pad + (i + 1) * slot - slot * 0.08 })),
    },
  };
}

/** Readable name: "● ↑ ↓ ↑". */
export const contourLabel = (card) => card.chars.join(' ');

/** A sentence for a legend: what each symbol on these cards means. */
export function contourLegend(cards) {
  const used = new Set(cards.flatMap((c) => c.chars ?? []));
  return [...used].map((ch) => `<b>${ch}</b> ${SYMBOLS[ch].text}`).join(' · ');
}

/**
 * An example of the card over `chordSymbol` in `key`: the notes the piano
 * plays in the demonstration (null for a rest). It starts on the root of the
 * chord around the middle of the keyboard and follows the arrows.
 */
export function exampleNotes(card, chordSymbol, key, { from = 60 } = {}) {
  const scale = scaleOf(key);
  const chord = parseChord(chordSymbol);
  let current = null;
  return card.symbols.map((id) => {
    if (id === 'rest') return null;
    if (id === 'start' || current === null) {
      // The root of the chord at or above `from`; if the root is not in the
      // scale (a borrowed chord), the first chord tone that is.
      const pcs = [chord.root, ...chord.triad].filter((pc) => scale.includes(pc));
      const pc = pcs[0] ?? chord.root;
      current = from + mod(pc - from, 12);
      return current;
    }
    const next = stepFrom(current, SYMBOLS[cardChar(id)].step, scale);
    current = next ?? current;
    return current;
  });
}

const cardChar = (id) => Object.keys(SYMBOLS).find((ch) => SYMBOLS[ch].id === id);

/**
 * What the next note has to be, given the last correct note: a list of
 * acceptable MIDI notes near the middle of the keyboard (for painting keys)
 * and a short text. `symbol` is the symbol of the step that is coming.
 */
export function expectedNotes(symbol, previous, chordSymbol, key) {
  const scale = scaleOf(key);
  const chord = parseChord(chordSymbol);
  if (symbol === 'rest') return { notes: [], text: 'silenci' };
  if (symbol === 'start' || previous === null) {
    const notes = [];
    for (let n = 55; n <= 79; n++) if (chord.triad.includes(pitchClass(n))) notes.push(n);
    return { notes, text: `una nota de ${chord.symbol}` };
  }
  const step = SYMBOLS[cardChar(symbol)].step;
  const n = stepFrom(previous, step, scale);
  return { notes: n === null ? [] : [n], text: SYMBOLS[cardChar(symbol)].text };
}

/**
 * Judge one note against a step. Returns { ok, kind, text } where kind is
 * 'hit' | 'wrong' (not of the chord / not of the scale) | 'contour' (wrong direction or size).
 */
export function judgeStep(symbol, note, previous, chordSymbol, key) {
  const scale = scaleOf(key);
  const chord = parseChord(chordSymbol);
  if (symbol === 'start' || previous === null) {
    if (chord.tones.includes(pitchClass(note))) return { ok: true, kind: 'hit', text: '' };
    return { ok: false, kind: 'wrong', text: `no és de ${chord.symbol}` };
  }
  const d = degreeOf(note, scale);
  if (d === null) return { ok: false, kind: 'wrong', text: 'fora de l\'escala' };
  const dPrev = degreeOf(previous, scale);
  const diff = dPrev === null ? Math.sign(note - previous) : d - dPrev;
  const want = SYMBOLS[cardChar(symbol)].step;
  if (diff === want) return { ok: true, kind: 'hit', text: '' };
  const arrow = cardChar(symbol);
  const got = diff === 0 ? '→' : diff > 0 ? (diff === 1 ? '↑' : '⇈') : diff === -1 ? '↓' : '⇊';
  return { ok: false, kind: 'contour', text: `era ${arrow}, ha sonat ${got}` };
}
