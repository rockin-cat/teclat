// Connecta el joc de teclat amb la classe del portal Rockin: el docent veu els camins i el temps de pràctica.
import { connectaClasse } from '/classe/classe.js';
import { ROCKIN_PATH, WORKSHOP_PATH } from './missions.js';
import { SONGBOOK } from './songbook.js';

const CLAU = 'rockin.play.v1';
const llegeix = () => { try { return JSON.parse(localStorage.getItem(CLAU)) ?? {}; } catch { return {}; } };
const estat = (s) => (s === undefined ? null : s >= 3 ? 'ok' : s >= 2 ? 'gairebe' : 'no');

function perfil() {
  const d = llegeix();
  const id = d.current;
  if (!id || id === '__professor' || !d.students?.[id]) return null;
  return { id, nom: d.students[id].name || 'Alumne' };
}

function resum() {
  const d = llegeix();
  const st = d.students?.[d.current];
  if (!st || d.current === '__professor') return null;
  const stars = st.stars ?? {};
  const log = st.log ?? [];
  const intentsDe = new Map();
  for (const e of log) intentsDe.set(e.m, (intentsDe.get(e.m) ?? 0) + 1);
  const costa = [];
  const blocsDe = (path, nomCami) => path.worlds.map((w) => {
    const items = w.missions.map((m) => {
      const e = estat(stars[m.id]);
      const n = intentsDe.get(m.id) ?? 0;
      if (n >= 3 && e !== 'ok') costa.push(`${w.title} · ${m.title} (${n} intents)`);
      return { t: m.title, e, n };
    });
    return { titol: `${nomCami} · ${w.title}`, fet: items.filter((x) => x.e === 'ok' || x.e === 'gairebe').length, total: items.length, items };
  });
  const blocs = blocsDe(ROCKIN_PATH, 'Camí ROCKIN');
  const fet = blocs.reduce((x, b) => x + b.fet, 0), total = blocs.reduce((x, b) => x + b.total, 0);
  const nivell = blocs.reduce((m, b, i) => (b.fet ? i + 1 : m), 0);
  const tallerTocat = WORKSHOP_PATH.missions.some((m) => stars[m.id] !== undefined);
  if (tallerTocat) blocs.push(...blocsDe(WORKSHOP_PATH, 'Taller d’acords').filter((b) => b.items.some((x) => x.e)));
  // Cançons: comptem les missions que hi ha provat i les que ja li surten
  const perCami = new Map();
  for (const e of log) {
    if (e.p === ROCKIN_PATH.id || e.p === WORKSHOP_PATH.id || !e.p) continue;
    const c = perCami.get(e.p) ?? new Set();
    c.add(e.m);
    perCami.set(e.p, c);
  }
  for (const [id, ms] of perCami) {
    const llibre = SONGBOOK.find((s) => s.id === id);
    const items = [...ms].filter((m) => m !== 'placement' && m !== 'jam').map((m) => ({ t: m, e: estat(stars[m]), n: intentsDe.get(m) ?? 0 }));
    if (!items.length) continue;
    // els noms de les missions de cada cançó es generen al joc: aquí només en donem els comptes
    blocs.push({ titol: `Cançó · ${llibre ? `${llibre.name}${llibre.artist ? ' · ' + llibre.artist : ''}` : 'cançó pròpia'}`, fet: items.filter((x) => x.e === 'ok' || x.e === 'gairebe').length, total: null, provades: items.length, items: [] });
  }
  const darrer = log.length ? log[log.length - 1].t : null;
  return { v: 1, app: 'teclat', titol: 'Camí ROCKIN de teclat', fet, total, nivell, intents: log.length, darrer, costa: costa.slice(0, 5), blocs };
}

connectaClasse({ app: 'teclat', perfil, resum });
