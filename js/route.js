// The route of the keyboard: the ROCKIN poster "Piano / Teclat · Full de ruta ·
// Nivells", ten levels, each with short steps. Nothing is locked: the poster is
// a map, and the student chooses where to go. Every step is played over the
// student's own song (its wheel, structure, style and tempo).
//
// A step points to a mission of the song's path (`mid`, a mission id suffix
// such as 'l:steps', in the one-hand path or in one of the two-hand paths),
// or to a special kind (`improv`, `compose`). `voice` steps add a voice task
// the game cannot judge, so the student says how it went. `sounds` steps let
// the student pick a keyboard sound per part of the song.

import { LEVEL_NAMES } from './levels.js';

export const ROUTE = [
  {
    n: 1,
    titol: 'Roda d\'acords',
    sub: 'Tocar una roda d\'acords',
    icona: '🎵',
    banda: 'Pots acompanyar una cançó sencera amb els seus acords, un per compàs, al tempo del grup.',
    passos: [
      { id: '1a', titol: 'Construeix els acords', text: 'Cada acord de la roda, nota a nota, comptant tecles.', chords: true },
      { id: '1b', titol: 'La roda pas a pas', text: 'Un acord darrere l\'altre, amb les tecles pintades i després de memòria. El joc t\'espera.', mid: 'l:steps' },
      { id: '1c', titol: 'La roda amb música', text: 'Un acord llarg per compàs, amb la banda.', mid: 'l:long' },
      { id: '1d', titol: 'La roda de memòria', text: 'Dues voltes sense tecles pintades.', mid: 'l:goal' },
      { id: '1x', titol: 'Acords barrejats', text: 'La roda pas a pas, però cada volta en un ordre diferent: així els acords no depenen de l\'ordre.', mid: 'l:steps', shuffle: true },
      { id: '1e', titol: 'La roda a tempo', text: 'La roda com a la cançó, a cada temps.', mid: 's:0' },
      { id: '1z', titol: 'Com a l\'assaig', text: 'La roda a tempo només amb les cartes: sense teclat, sense pilota. El joc t\'escolta i t\'ho diu al final.', mid: 's:0', rehearsal: true },
    ],
  },
  {
    n: 2,
    titol: 'Patrons rítmics',
    sub: 'Tocar amb patrons rítmics diferents',
    icona: '♩',
    banda: 'Pots tocar la roda amb la carta de ritme que demani la cançó, i canviar-la sense perdre el pols.',
    passos: [
      { id: '2a', titol: 'Un acord a cada temps', text: 'La carta de quatre rodones, amb ajuda al teclat.', mid: 't:0' },
      { id: '2b', titol: 'Sense ajuda', text: 'Una carta amb nota llarga, sense tecles pintades.', mid: 't:1' },
      { id: '2c', titol: 'Amb silencis', text: 'Una carta amb una rodona blanca: espera.', mid: 't:2' },
      { id: '2d', titol: 'Tres cartes seguides', text: 'Tres cartes diferents sobre la roda.', mid: 't:3' },
      { id: '2e', titol: 'Cartes més difícils', text: 'Contratemps i rodones partides.', mid: 's:1' },
      { id: '2f', titol: 'Toca amb la banda', text: 'La banda no s\'atura: si t\'equivoques, torna a entrar.', mid: 't:4' },
      { id: '2z', titol: 'Com a l\'assaig', text: 'Tres cartes seguides només amb les cartes i la banda; el resultat, al final.', mid: 't:3', rehearsal: true },
    ],
  },
  {
    n: 3,
    titol: 'Canviar els sons',
    sub: 'Decidir-ho segons l\'estructura de la cançó',
    icona: '🎛',
    banda: 'Tries el so del teclat per a cada part (piano, elèctric, orgue, pad) i el canvies quan canvia la cançó.',
    passos: [
      { id: '3a', titol: 'Dos sons: estrofa i tornada', text: 'Un so per a cada part. Escolta com canvia la cançó quan canvia el so.', mid: 'structure', sounds: 2 },
      { id: '3b', titol: 'Tria el so de cada part', text: 'Decideix tu el so de totes les parts i toca la cançó sencera.', mid: 'structure', sounds: 'all' },
      { id: '3z', titol: 'Com a l\'assaig', text: 'La cançó sencera, part per part, només amb les cartes i la banda.', mid: 'structure', rehearsal: true },
    ],
  },
  {
    n: 4,
    titol: 'Cantar i tocar',
    sub: 'Coordinació de veu i teclat',
    icona: '🎤',
    banda: 'Pots fer els cors o cantar la cançó mentre acompanyes amb el teclat.',
    passos: [
      { id: '4a', titol: 'Compta en veu alta', text: 'Toca la roda a cada temps i compta «1, 2, 3, 4» en veu alta.', mid: 't:0', voice: 'count' },
      { id: '4b', titol: 'Compta les corxeres', text: 'La mateixa roda comptant «1 i 2 i 3 i 4 i».', mid: 't:1', voice: 'count8' },
      { id: '4c', titol: 'Canta la fonamental', text: 'Canta la nota de baix de cada acord mentre toques.', mid: 's:0', voice: 'root' },
      { id: '4d', titol: 'Canta la cançó', text: 'Canta la lletra (o la melodia) mentre toques la roda.', mid: 's:0', voice: 'sing' },
    ],
  },
  {
    n: 5,
    titol: 'Variacions de mans',
    sub: 'Amb variacions de mà dreta i esquerra',
    icona: '✋',
    banda: 'Pots repartir la feina entre les mans: el baix a l\'esquerra, l\'acord a la dreta, o les dues alternades.',
    passos: [
      { id: '5a', titol: 'Les dues mans, el mateix acord', text: 'L\'esquerra fa de mirall de la dreta.', from: 'chord', mid: 't:0' },
      { id: '5b', titol: 'Esquerra el baix, dreta l\'acord', text: 'A baix la fonamental; a dalt les tres notes.', from: 'bass', mid: 't:0' },
      { id: '5c', titol: 'Baix i acord amb silencis', text: 'La carta amb rodona blanca, a dues mans.', from: 'bass', mid: 't:2' },
      { id: '5d', titol: 'Cada mà el seu ritme', text: 'Fila blava per a la dreta, taronja per a l\'esquerra.', from: 'bass', world: 'mans-ritmes', at: 0 },
      { id: '5e', titol: 'Mans alternades', text: 'Dreta, esquerra, dreta, esquerra dins del mateix temps.', from: 'bass', world: 'mans-dificil', at: 0 },
      { id: '5z', titol: 'Com a l\'assaig', text: 'Baix i acord amb silencis, a dues mans, només amb les cartes i la banda.', from: 'bass', mid: 't:2', rehearsal: true },
    ],
  },
  {
    n: 6,
    titol: 'Patrons melòdics',
    sub: 'Tocar amb patrons melòdics diferents',
    icona: '📈',
    banda: 'Pots arpegiar els acords seguint una carta de melodia: la mateixa roda sona com una melodia.',
    passos: [
      { id: '6a', titol: 'La roda nota a nota', text: 'Fonamental, tercera i quinta, d\'una en una.', mid: 'arp:notes' },
      { id: '6b', titol: 'Dues notes: amunt i avall', text: 'Una carta de dues alçades.', mid: 'arp:1' },
      { id: '6c', titol: 'Dues notes repetides', text: 'La línia plana és la mateixa nota.', mid: 'arp:3' },
      { id: '6d', titol: 'Tres notes', text: 'Una carta de tres alçades.', mid: 'arp:4' },
      { id: '6e', titol: 'Tres cartes melòdiques', text: 'Tres cartes diferents sobre la roda.', mid: 'arp:repte' },
      { id: '6z', titol: 'Com a l\'assaig', text: 'Tres cartes melòdiques només amb les cartes i la banda.', mid: 'arp:repte', rehearsal: true },
    ],
  },
  {
    n: 7,
    titol: 'Inversions',
    sub: 'Invertir els acords amb una digitació correcta',
    icona: '🔁',
    banda: 'Canvies d\'acord movent la mà el mínim: els canvis sonen lligats i no es veuen.',
    passos: [
      { id: '7a', titol: 'Inverteix el primer acord', text: 'Les tres posicions del primer acord de la roda.', mid: 'i:0' },
      { id: '7b', titol: 'La roda a prop, pas a pas', text: 'Cada acord a la posició més propera.', mid: 'i:steps' },
      { id: '7c', titol: 'La roda a prop amb música', text: 'Amb la banda i les tecles pintades.', mid: 'i:long' },
      { id: '7d', titol: 'Inversions amb la banda', text: 'Quatre cartes, cada acord a prop.', mid: 'i:band' },
      { id: '7z', titol: 'Com a l\'assaig', text: 'Quatre cartes amb inversions, només amb les cartes i la banda.', mid: 'i:band', rehearsal: true },
    ],
  },
  {
    n: 8,
    titol: 'Recursos tècnics',
    sub: 'Appoggiatura, notes de pas, glissando',
    icona: '⚡',
    banda: 'Adornes l\'acompanyament: notes de pas entre acords, brodadures i glissandos que porten a la tornada.',
    passos: [
      { id: '8a', titol: 'Notes de pas', text: 'Tres notes seguides de l\'escala, pujant: la del mig és la nota de pas.', mid: 'con:5' },
      { id: '8b', titol: 'Appoggiatura', text: 'Una nota veïna que es recolza i torna a la de l\'acord.', mid: 'con:2' },
      { id: '8c', titol: 'Salts i passos', text: 'Un salt de tercera i tornar per graus.', mid: 'con:9' },
      { id: '8d', titol: 'Tres girs seguits', text: 'Tres cartes de fletxes sobre la roda.', mid: 'con:repte' },
      { id: '8z', titol: 'Com a l\'assaig', text: 'Tres girs seguits només amb les cartes i la banda.', mid: 'con:repte', rehearsal: true },
      { id: '8e', titol: 'Glissando', text: 'Llisca amb el dors de la mà per les tecles blanques fins a caure a la fonamental del primer temps de cada roda.', mid: 't:0', voice: 'gliss' },
    ],
  },
  {
    n: 9,
    titol: 'Composició',
    sub: 'Compondre introduccions, solos o melodies',
    icona: '✒️',
    banda: 'Pots proposar al grup una introducció, un solo curt o una melodia de teclat per a la cançó.',
    passos: [
      { id: '9a', titol: 'Una introducció amb cartes', text: 'Tria dues cartes de ritme i toca-les com a introducció de la cançó.', compose: 'cards' },
      { id: '9b', titol: 'Una melodia amb fletxes', text: 'Escriu el contorn (● ↑ ↓ → ⇈ ⇊ ○) i toca\'l sobre la roda.', compose: 'arrows' },
      { id: '9c', titol: 'Un solo de quatre compassos', text: 'Amb la banda, quatre compassos per a tu amb un repte.', improv: { mode: 'reptes', guide: 'penta' } },
    ],
  },
  {
    n: 10,
    titol: 'Improvisació',
    sub: 'Improvisar dins d\'una roda d\'acords',
    icona: '✏️',
    banda: 'Pots improvisar sobre la roda de la cançó: la banda no s\'atura i tu inventes.',
    passos: [
      { id: '10a', titol: 'Notes de l\'acord', text: 'Roda oberta amb les notes de l\'acord marcades.', improv: { mode: 'lliure', guide: 'acord' } },
      { id: '10b', titol: 'La pentatònica', text: 'Cinc notes per a tota la roda.', improv: { mode: 'lliure', guide: 'penta' } },
      { id: '10c', titol: 'Pregunta i resposta', text: 'Mitja roda pregunta el piano i l\'altra mitja contestes tu.', improv: { mode: 'dialeg', guide: 'penta' } },
      { id: '10d', titol: 'Lliure, amb reptes', text: 'Una consigna cada vegada, sense res marcat.', improv: { mode: 'reptes', guide: 'res' } },
    ],
  },
];

export const ALL_STEPS = ROUTE.flatMap((level) => level.passos.map((p) => ({ ...p, level })));
export const stepById = (id) => ALL_STEPS.find((p) => p.id === id) ?? null;

/** The voice task of a step, as the student reads it. */
export const VOICE_TEXT = {
  count: 'Mentre toques, <b>compta en veu alta</b>: «1, 2, 3, 4».',
  count8: 'Mentre toques, <b>compta les corxeres</b> en veu alta: «1 i 2 i 3 i 4 i».',
  root: 'Mentre toques, <b>canta la nota de baix</b> de cada acord (la fonamental).',
  sing: 'Mentre toques, <b>canta la cançó</b> (la lletra o la melodia).',
  gliss: 'Al primer temps de cada roda, entra amb un <b>glissando</b>: llisca pel teclat fins a la fonamental i continua amb la carta.',
};

/** Achievement levels, with the stored value kept short. */
export const NIVELLS = { no: LEVEL_NAMES[0], gairebe: LEVEL_NAMES[1], ok: LEVEL_NAMES[2] };
export const LEVEL_RANK = { no: 0, gairebe: 1, ok: 2 };

/** From the game's measure of a try to a proposed level (the student can change it). */
export function proposeLevel({ stars = null, ratio = null }) {
  if (ratio !== null) return ratio >= 0.9 ? 'ok' : ratio >= 0.7 ? 'gairebe' : 'no';
  if (stars !== null) return stars >= 3 ? 'ok' : stars >= 2 ? 'gairebe' : 'no';
  return 'gairebe';
}

/** "Què t'ha faltat": the gaps a step can have, by what it asks. */
export const GAPS = {
  acord: { t: 'Trobar les notes de l\'acord', tip: 'Compta les tecles: 4 i 3 (major) o 3 i 4 (menor) des de la fonamental.' },
  alhora: { t: 'Les tres tecles alhora', tip: 'Prepara la forma de la mà a l\'aire i baixa-la de cop.' },
  canvi: { t: 'Canviar d\'acord a temps', tip: 'Mira l\'acord que ve mentre encara toques l\'anterior.' },
  pols: { t: 'Mantenir el pols', tip: 'Compta en veu alta o pica amb el peu; tria un tempo més lent.' },
  carta: { t: 'Seguir el ritme de la carta', tip: 'Escolta la demostració i canta la carta («du, du, de») abans de tocar.' },
  silenci: { t: 'Respectar els silencis', tip: 'A la rodona blanca, aixeca la mà de les tecles.' },
  llarga: { t: 'Mantenir les notes llargues', tip: 'A la barra, deixa les tecles premudes fins al final.' },
  banda: { t: 'Seguir la banda sense perdre\'m', tip: 'Si et perds, no paris: torna a entrar al compàs següent.' },
  on: { t: 'Saber on som de la cançó', tip: 'Mira l\'etiqueta de la part (estrofa, tornada) i compta les voltes.' },
  mans: { t: 'Coordinar les dues mans', tip: 'Primer cada mà sola, després juntes a poc a poc.' },
  linia: { t: 'Seguir la línia de la carta', tip: 'Si la línia puja, nota més aguda; si baixa, més greu.' },
  escala: { t: 'Les notes de l\'escala', tip: 'Les fletxes es llegeixen amb les tecles blanques (en Do major).' },
  inversio: { t: 'La posició de l\'acord', tip: 'Busca la posició on la mà es mou menys.' },
  so: { t: 'Triar un so que encaixi', tip: 'Sons curts per a les estrofes, sons llargs per a les tornades.' },
  veu: { t: 'Cantar (o comptar) i tocar alhora', tip: 'Primer canta sense tocar, després toca sense cantar, i ajunta-ho a poc a poc.' },
  encaixa: { t: 'Trobar notes que encaixin', tip: 'Acaba les frases en una nota de l\'acord.' },
  espai: { t: 'Deixar espais', tip: 'Un compàs sencer de silenci fa que el que ve després es senti més.' },
  idea: { t: 'Tenir una idea i repetir-la', tip: 'Una idea curta, repetida, ja és música.' },
};

/** The gaps that make sense for a step. */
export function gapsFor(step, mission, routeLevel = step.level) {
  const out = new Set();
  const type = mission?.type;
  const level = mission?.world?.level;
  const n = routeLevel?.n ?? 0;
  if (n === 1 || type === 'chord' || type === 'steps' || type === 'change') out.add('acord').add('alhora').add('canvi');
  if (['pattern', 'mix', 'song', 'structure', 'band'].includes(type)) out.add('pols').add('carta').add('canvi');
  if (['mix', 'band', 'song', 'structure'].includes(type)) out.add('banda');
  if (type === 'structure' || step.sounds) out.add('on');
  if (step.sounds) out.add('so');
  if (mission?.world?.twoHands) out.add('mans');
  if (level === 3) out.add('linia');
  if (level === 5) out.add('escala');
  if (mission?.world?.inversions || type === 'invert') out.add('inversio');
  if (step.voice) out.add('veu');
  if (step.improv || step.compose) out.add('encaixa').add('espai').add('idea').add('pols');
  if (n === 2) out.add('silenci').add('llarga');
  return [...out];
}

/** "Què creus que necessites ara?" */
export const CHOICES = {
  slower: 'Baixar el tempo',
  faster: 'Pujar el tempo',
  'help-on': 'Posar ajuda',
  'help-off': 'Treure l\'ajuda',
  repeat: 'Repetir igual',
  back: 'Tornar a un pas anterior',
  next: 'Passar al pas següent',
  done: 'Ja no cal: ho porto al grup',
};

/**
 * The option the game would propose, from the level reached and what was
 * missing. The student decides; this only lights one.
 */
export function suggestChoice({ level, gaps, helped, canSlow, canFast, canHelp = !helped, hasPrev, hasNext }) {
  if (level === 'ok') return hasNext ? (helped ? 'help-off' : 'next') : 'done';
  if (level === 'gairebe') {
    if (gaps.includes('pols') && canSlow) return 'slower';
    if (helped && canFast) return 'repeat';
    return 'repeat';
  }
  if (gaps.includes('acord') || gaps.includes('alhora')) return hasPrev ? 'back' : canHelp ? 'help-on' : 'repeat';
  if (canHelp) return 'help-on';
  if (canSlow) return 'slower';
  return 'repeat';
}
