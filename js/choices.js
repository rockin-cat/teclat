// «Què creus que necessites ara?»: after a result the student chooses how to
// go on, and the choices are kept (st.choices) to see later, in «Què sé fer»,
// whether they worked. The game's own proposal (`suggested`) is kept too, but
// it is only shown there, never on the result.
//
// One entry: { t, m, p, title, level (0–2), gaps, choice, cl (its label),
//   suggested, sl (its label), target (mission id the choice led to), nextLevel }.

import { LEVEL_NAMES } from './levels.js';

export const CHOICES_MAX = 300;
/** How many decisions before «Com tries el teu camí» says anything. */
export const CHOICES_MIN = 5;

/** Names of the choices inside a sentence. */
export const CHOICE_NAMES = {
  slower: 'baixar el tempo',
  faster: 'pujar el tempo',
  'help-on': 'posar ajuda',
  'help-off': 'treure l\'ajuda',
  part: 'practicar només el que falla',
  back: 'tornar a una missió anterior',
  repeat: 'repetir igual',
  next: 'passar a la següent',
  done: 'portar-ho al grup',
};

const decided = (choices) => (choices ?? []).filter((c) => c.choice);
/** Did the choice work? Better level afterwards, or «Ja ho tens!» kept. */
const worked = (c) => c.nextLevel > c.level || (c.level === 2 && c.nextLevel === 2);
const times = (n) => `${n} ${n === 1 ? 'vegada' : 'vegades'}`;

/**
 * 2–4 short sentences about how the student's choices have worked (empty below
 * CHOICES_MIN). `teacher`: the same, in the third person and plain text.
 */
export function observeChoices(choices, { teacher = false } = {}) {
  const list = decided(choices);
  if (list.length < CHOICES_MIN) return [];
  const out = [];
  const say = (you, them) => out.push(teacher ? them.replace(/<[^>]+>/g, '') : you);
  const byChoice = new Map();
  for (const c of list) {
    if (!byChoice.has(c.choice)) byChoice.set(c.choice, []);
    byChoice.get(c.choice).push(c);
  }
  const judged = (arr) => arr.filter((c) => c.nextLevel !== undefined && c.nextLevel !== null);

  // The choice made most often (when something is not yet «Ja ho tens!»), and how it went.
  const hard = list.filter((c) => c.level < 2 && c.choice !== 'done');
  const countHard = new Map();
  for (const c of hard) countHard.set(c.choice, (countHard.get(c.choice) ?? 0) + 1);
  const top = [...countHard].sort((a, b) => b[1] - a[1])[0];
  if (top && top[1] >= 2) {
    const j = judged(hard.filter((c) => c.choice === top[0]));
    const good = j.filter(worked).length;
    const name = CHOICE_NAMES[top[0]] ?? top[0];
    if (j.length >= 2 && good / j.length >= 0.6) say(`Quan et costa, sols triar <b>${name}</b>, i et funciona: has millorat ${good} de ${j.length} vegades.`, `Quan li costa, sol triar ${name}, i li funciona (millora ${good} de ${j.length}).`);
    else if (j.length >= 2) say(`Quan et costa, sols triar <b>${name}</b>, però no sempre et funciona: has millorat ${good} de ${j.length} vegades. Pots provar alguna altra opció.`, `Quan li costa, sol triar ${name}, però no sempre li funciona (millora ${good} de ${j.length}).`);
    else say(`Quan et costa, sols triar <b>${name}</b>. Quan hi hagis tornat unes quantes vegades, aquí veuràs si et funciona.`, `Quan li costa, sol triar ${name}.`);
  }

  // The choice that has worked best (if it is not the one just named).
  const best = [...byChoice]
    .filter(([id]) => id !== 'done' && id !== top?.[0])
    .map(([id, arr]) => {
      const j = judged(arr);
      return { id, n: j.length, good: j.filter(worked).length };
    })
    .filter((x) => x.n >= 2 && x.good / x.n >= 0.6)
    .sort((a, b) => b.good / b.n - a.good / a.n || b.n - a.n)[0];
  if (best) say(`La tria que millor et funciona és <b>${CHOICE_NAMES[best.id] ?? best.id}</b>: has millorat ${best.good} de ${best.n} vegades.`, `La tria que millor li funciona: ${CHOICE_NAMES[best.id] ?? best.id} (millora ${best.good} de ${best.n}).`);

  // Repeating the same thing again and again without it getting better.
  let run = 0;
  let longest = 0;
  for (const c of list) {
    if (c.choice === 'repeat' && c.level < 2 && !(c.nextLevel > c.level)) run++;
    else run = 0;
    longest = Math.max(longest, run);
  }
  if (longest >= 3) say('Has repetit igual moltes vegades seguides sense canviar res. Quan no surt, prova de canviar alguna cosa: el tempo, l\'ajuda o practicar la part que falla.', `Repeteix igual moltes vegades seguides (fins a ${longest}) sense que millori.`);

  // Moving on while still «En procés».
  const early = list.filter((c) => c.choice === 'next' && c.level === 0);
  if (early.length >= 2) {
    const j = judged(early);
    const hardAfter = j.filter((c) => c.nextLevel === 0).length;
    if (j.length && hardAfter / j.length >= 0.5) say('Sovint passes a la següent abans d\'arribar a «A prop». Quan ho has fet, la missió següent t\'ha costat més.', 'Sovint passa a la següent encara «En procés», i la següent li costa més.');
    else if (j.length) say('A vegades passes a la següent encara «En procés», i normalment t\'ha anat bé: tu notes quan ja pots avançar.', 'A vegades passa a la següent encara «En procés», i li va bé.');
  }

  // Going back to what is already «Ja ho tens!».
  const again = list.filter((c) => c.level === 2 && ['repeat', 'back', 'slower', 'help-on'].includes(c.choice));
  if (again.length >= 2) say('Tornes a passos que ja tens a «Ja ho tens!»: quan ja ho tens, pots avançar o portar-ho al grup.', 'Torna a passos que ja té a «Ja ho tens!».');

  // Autonomy: taking help away or speeding up.
  // Autonomy is always recognised: it keeps a place among the four sentences.
  if (out.length > 3) out.length = 3;
  const brave = list.filter((c) => c.choice === 'help-off' || c.choice === 'faster');
  if (brave.length) {
    const off = brave.filter((c) => c.choice === 'help-off').length;
    if (off) say(`Treus l'ajuda quan ja estàs a prop (${times(off)}): bona decisió, és el camí per deixar l'eina.`, `Treu l'ajuda quan ja està a prop (${times(off)}).`);
    else say(`Puges el tempo quan ja et surt (${times(brave.length)}): així t'acostes al que tocaràs amb el grup.`, `Puja el tempo quan ja li surt (${times(brave.length)}).`);
  }
  return out.slice(0, 4);
}

/** The main sentence, for the teacher view (plain text). */
export function mainObservation(choices) {
  const n = decided(choices).length;
  if (n < CHOICES_MIN) return n ? `${n} ${n === 1 ? 'decisió' : 'decisions'}: encara poques.` : '';
  return observeChoices(choices, { teacher: true })[0] ?? `${n} decisions, sense cap tendència clara.`;
}

/** The last decisions (newest first), as sentences; «Una altra opció era…» only when the game would have proposed something else. */
export function recentDecisions(choices, max = 8) {
  return decided(choices).slice(-max).reverse().map((c) => {
    const after = c.nextLevel === undefined || c.nextLevel === null
      ? ' → encara no hi has tornat'
      : ` → després <b>${LEVEL_NAMES[c.nextLevel]}</b>`;
    const other = c.suggested && c.suggested !== c.choice && c.sl ? ` Una altra opció era <i>${escape(c.sl)}</i>.` : '';
    return `A «${escape(c.title ?? c.m)}» estaves <b>${LEVEL_NAMES[c.level] ?? ''}</b>: vas triar <i>${escape(c.cl ?? CHOICE_NAMES[c.choice] ?? c.choice)}</i>${c.choice === 'done' ? '' : after}.${other}`;
  });
}

function escape(text) {
  return String(text).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
}
