// Icones de línia (24×24, traç del color del text) en lloc dels emojis de la interfície.
// Les dades poden continuar guardant el símbol antic: aquí es converteix en icona.
const P = {
  teclat: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M7 5v8M12 5v8M17 5v8M2 13h20"/>',
  guitarra: '<path d="m11.9 12.1 7.6-7.6"/><path d="m18 2 4 4-2 2-4-4z"/><path d="M9.2 9.7c-1.2-.3-2.6 0-3.5.9l-.5.5c-1 1-1.2 2.5-.5 3.8L3 16.6a2 2 0 0 0 0 2.8l1.6 1.6a2 2 0 0 0 2.8 0l1.7-1.7c1.2.7 2.8.5 3.8-.5l.5-.5c.9-.9 1.2-2.3.9-3.5"/><circle cx="9" cy="15" r="1"/>',
  llibre: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
  biblioteca: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="m16 5 3.8-1 3 15.5-3.8 1z"/>',
  llapis: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  ploma: '<path d="m12 19 7-7 3 3-7 7z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="m2 2 7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
  cadenat: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  ma: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
  mans: '<path d="M8 11V6a1.5 1.5 0 0 0-3 0v7"/><path d="M5 10a1.5 1.5 0 0 0-3 0v4a7 7 0 0 0 7 7"/><path d="M16 11V6a1.5 1.5 0 0 1 3 0v7"/><path d="M19 10a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7"/><path d="M8 8V4a1.5 1.5 0 0 1 3 0v6M16 8V4a1.5 1.5 0 0 0-3 0v6"/>',
  escolta: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/>',
  diana: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  lent: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
  rapid: '<path d="m13 19 9-7-9-7zM2 19l9-7-9-7z"/>',
  consell: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  eina: '<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z"/>',
  bruixola: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  inici: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  alumne: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  estrella: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  paleta: '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-2 2-2H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  engranatge: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  afinador: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  ajuda: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3"/>',
  nota: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  ritme: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  micro: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
  grafic: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  capes: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
  llamp: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  blocs: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  rellotge: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
};

const DE_SIMBOL = {
  '🎹': 'teclat', '🎸': 'guitarra', '📖': 'llibre', '📚': 'biblioteca', '✏': 'llapis', '✒': 'ploma', '🔒': 'cadenat',
  '✋': 'ma', '🙌': 'mans', '👂': 'escolta', '🎯': 'diana', '🐢': 'lent', '🐇': 'rapid', '💡': 'consell', '🔧': 'eina',
  '🧭': 'bruixola', '🚀': 'inici', '🧑‍🎓': 'alumne', '✨': 'estrella', '🎨': 'paleta', '⚙': 'engranatge', '🎛': 'afinador',
  '🛟': 'ajuda', '🎵': 'nota', '♬': 'nota', '♩': 'ritme', '🎤': 'micro', '📈': 'grafic', '🔁': 'capes', '⚡': 'llamp',
  '🔍': 'lupa', '🧱': 'blocs', '⏱': 'rellotge',
};
const net = (s) => String(s ?? '').replace(/️/g, '').trim();

/** L'SVG d'una icona (pel nom o pel símbol antic), o '' si no n'hi ha. */
export function iconaHtml(x) {
  const nom = P[x] ? x : DE_SIMBOL[net(x)];
  return nom ? `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[nom]}</svg>` : '';
}

/** Un element amb la icona; si el símbol no en té, hi posa el text tal qual. */
export function icona(x, className = '', tag = 'span') {
  const e = document.createElement(tag);
  if (className) e.className = className;
  const h = iconaHtml(x);
  if (h) e.innerHTML = h; else e.textContent = x ?? '';
  return e;
}
