// Level of achievement, the same in every Rockin tool: «En procés», «A prop»,
// «Ja ho tens!». Results are still scored 0–3 inside the game (and old saves
// keep their numbers); this is how they are named and shown.

export const LEVEL_NAMES = ['En procés', 'A prop', 'Ja ho tens!'];

/** 0–3 score → 0 (En procés), 1 (A prop), 2 (Ja ho tens!). */
export const levelOf = (score) => ((score ?? 0) >= 3 ? 2 : (score ?? 0) >= 2 ? 1 : 0);
export const levelName = (score) => LEVEL_NAMES[levelOf(score)];
/** A step counts as done from «A prop» on. */
export const isDone = (score) => (score ?? 0) >= 2;

/** A small text badge with the level name (nothing for a step never tried). */
export function levelBadge(score, { small = false } = {}) {
  const node = document.createElement('span');
  if (score === undefined || score === null) {
    node.className = 'level-badge none';
    return node;
  }
  const level = levelOf(score);
  node.className = `level-badge l${level}${small ? ' small' : ''}`;
  node.textContent = LEVEL_NAMES[level];
  return node;
}

export const PATH_END_TEXT = 'Has acabat el camí. Ja pots portar-ho al teu grup: a partir d\'ara, aquesta eina només la necessites per repassar alguna cosa concreta.';
