// A piano sound shared by the demonstrations, the backing chords and the
// student's own notes. It uses recorded piano samples (Salamander Grand Piano,
// CC BY 3.0, served by the Tone.js project) and, until they load or if they
// can't be loaded, a synthesised piano-like sound.

const SAMPLE_BASE = 'https://tonejs.github.io/audio/salamander/';
const SAMPLE_NOTES = ['A1', 'C2', 'D#2', 'F#2', 'A2', 'C3', 'D#3', 'F#3', 'A3', 'C4', 'D#4', 'F#4', 'A4', 'C5', 'D#5', 'F#5', 'A5', 'C6', 'D#6'];

let shared = null;

/** The keyboard sounds the student can choose (route level 3). */
export const SOUNDS = [
  { id: 'piano', name: 'Piano', hint: 'Clar i amb atac: per a estrofes i per començar.' },
  { id: 'electric', name: 'Piano elèctric', hint: 'Càlid i rodó: estrofes tranquil·les, balades.' },
  { id: 'orgue', name: 'Orgue', hint: 'Sostingut i ple: tornades, rock, reggae.' },
  { id: 'pad', name: 'Pad', hint: 'Un coixí llarg: intros i parts suaus.' },
];

export function pianoSound() {
  if (shared) return shared;
  const output = new Tone.Volume(-4).toDestination();

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'custom', partials: [1, 0.55, 0.3, 0.18, 0.08, 0.05] },
    envelope: { attack: 0.003, decay: 1.4, sustain: 0.08, release: 0.5 },
    volume: -10,
  }).connect(output);
  synth.maxPolyphony = 24;

  let sampler = null;
  let loaded = false;
  try {
    sampler = new Tone.Sampler({
      urls: Object.fromEntries(SAMPLE_NOTES.map((note) => [note, `${note.replace('#', 's')}.mp3`])),
      baseUrl: SAMPLE_BASE,
      release: 1,
      onload: () => {
        loaded = true;
        console.log('[Piano] samples loaded');
      },
      onerror: (error) => console.warn('[Piano] samples unavailable, using the synth', error),
    }).connect(output);
  } catch (error) {
    console.warn('[Piano] sampler not available', error);
  }

  const name = (midi) => Tone.Frequency(midi, 'midi').toNote();

  // Other keyboard sounds (level 3 of the route: "canviar els sons"): an organ,
  // an electric piano and a pad, all synthesised. 'piano' is the sampler.
  const others = {
    orgue: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'custom', partials: [1, 0.8, 0.5, 0.4, 0.2, 0.2, 0.1, 0.1] },
      envelope: { attack: 0.01, decay: 0.05, sustain: 0.9, release: 0.08 },
      volume: -14,
    }).connect(output),
    electric: new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2,
      modulationIndex: 1.6,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.004, decay: 0.9, sustain: 0.2, release: 0.6 },
      modulation: { type: 'sine' },
      modulationEnvelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 0.3 },
      volume: -10,
    }).connect(output),
    pad: new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'fatsawtooth', count: 3, spread: 18 },
      envelope: { attack: 0.35, decay: 0.3, sustain: 0.7, release: 1.2 },
      volume: -18,
    }).connect(output),
  };
  for (const v of Object.values(others)) v.maxPolyphony = 16;
  let current = 'piano';
  const voice = () => (current === 'piano' ? (loaded ? sampler : synth) : others[current] ?? synth);

  shared = {
    get loaded() {
      return loaded;
    },
    /** Plays MIDI notes for `seconds` at audio time `time`. */
    play(notes, seconds, time = Tone.now(), velocity = 0.8) {
      voice().triggerAttackRelease(notes.map(name), Math.max(0.05, seconds), time, velocity);
    },
    noteOn(note, velocity = 0.8) {
      voice().triggerAttack(name(note), Tone.immediate(), velocity);
    },
    noteOff(note) {
      // Release on every voice, in case the sound changed while the key was down.
      synth.triggerRelease(name(note), Tone.immediate());
      if (loaded) sampler.triggerRelease(name(note), Tone.immediate());
      for (const v of Object.values(others)) v.triggerRelease(name(note), Tone.immediate());
    },
    releaseAll() {
      synth.releaseAll();
      if (loaded) sampler.releaseAll();
      for (const v of Object.values(others)) v.releaseAll();
    },
    /** Which keyboard sound plays: 'piano' | 'orgue' | 'electric' | 'pad'. */
    setSound(kind) {
      if (kind !== current) this.releaseAll();
      current = SOUNDS.some((s) => s.id === kind) ? kind : 'piano';
    },
    get sound() {
      return current;
    },
    setVolume(db) {
      output.volume.value = db;
    },
  };
  return shared;
}
