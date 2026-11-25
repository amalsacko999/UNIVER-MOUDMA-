// Helpers de style — utilisés par .menu, .all-menu, .help et les cartes de commandes
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const info = require('./botinfo');

const STYLE_FILE = path.join(__dirname, '../data/menustyle.json');

// 5 styles (choisis avec .menustyle <1-5>) — le style 1 est la mise en page d'origine
const STYLES = {
  1: { // 🥷 Ninja
    head: n => `╔═✦${n}✦═══✰`, row: (l, v) => `║»✰ ${l} : ${v}`, foot: '╚═══════════════════✰',
    catHead: (i, t) => `╭──✦ ${i} *${t}* ✦──✰`, catRow: (c, d) => `│ ✰ ${c}${d ? ' ➜ ' + d : ''}`, catFoot: '╰───────────────✰',
  },
  2: { // ⚡ Électrique
    head: n => `┌─⚡${n}⚡──────┐`, row: (l, v) => `│⚡ ${l} : ${v}`, foot: '└────────────────────┘',
    catHead: (i, t) => `┌─⚡ ${i} *${t}*`, catRow: (c, d) => `│ ⚡ ${c}${d ? ' ➜ ' + d : ''}`, catFoot: '└─────────────⚡',
  },
  3: { // 🌑 Sombre
    head: n => `▛▀▀ ${n} ▀▀▀▀▜`, row: (l, v) => `▌ ${l} : ${v}`, foot: '▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟',
    catHead: (i, t) => `▛▀ ${i} *${t}*`, catRow: (c, d) => `▌ ▸ ${c}${d ? ' ➜ ' + d : ''}`, catFoot: '▙▄▄▄▄▄▄▄▄▄▄▄▄',
  },
  4: { // 🎯 Minimal
    head: n => `─── ${n} ───`, row: (l, v) => `· ${l} : ${v}`, foot: '──────────────────',
    catHead: (i, t) => `— ${i} *${t}* —`, catRow: (c, d) => `· ${c}${d ? ' — ' + d : ''}`, catFoot: '',
  },
  5: { // 👑 Royal
    head: n => `◈═══ ${n} ═══◈`, row: (l, v) => `║ ♛ ${l} : ${v}`, foot: '◈═════════════════◈',
    catHead: (i, t) => `◈══ ${i} *${t}* ══◈`, catRow: (c, d) => `║ ♦ ${c}${d ? ' ➜ ' + d : ''}`, catFoot: '◈═════════════◈',
  },
};

function getStyleNo() {
  try { const n = JSON.parse(fs.readFileSync(STYLE_FILE, 'utf-8')).style; return STYLES[n] ? n : 1; }
  catch { return 1; }
}
function S() { return STYLES[getStyleNo()]; }

function getMode() {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/messageCount.json'), 'utf-8'));
    return d.isPublic === false ? 'privé' : 'public';
  } catch { return 'public'; }
}

// Bloc d'infos du bot (en-tête du menu)
function infoBlock(username, prefix) {
  const now = moment().tz(info.TZ);
  const s = S();
  return [
    s.head(info.STYLED_NAME),
    s.row('*ʙᴏᴛ ɴᴀᴍᴇ*', info.BOT_NAME),
    s.row('*ᴜsᴇʀɴᴀᴍᴇ*', username || 'Utilisateur'),
    s.row('*ᴅᴇᴠᴇʟᴏᴘᴇʀ*', info.CREATORS.map(c => c.name).join(' & ')),
    s.row('*ᴠᴇʀsɪᴏɴ*', info.VERSION),
    s.row('*ᴍᴏᴅᴇ*', getMode()),
    s.row('*ᴘʀᴇғɪx*', prefix),
    s.row('*⏰ ʜᴇᴜʀᴇ*', now.format('HH:mm:ss')),
    s.row('*📅 ᴅᴀᴛᴇ*', now.format('DD/MM/YYYY')),
    s.foot,
  ].join('\n');
}

// Carte stylée générique : titre + lignes [libellé, valeur] ou texte brut
function card(title, rows = [], footerLines = []) {
  const s = S();
  const out = [s.head(`${info.STYLED_NAME}`), s.row('*' + title + '*', '').replace(/ : $/, '')];
  for (const r of rows) {
    out.push(Array.isArray(r) ? s.row(r[0], r[1]) : s.row(r, '').replace(/ : $/, ''));
  }
  out.push(s.foot);
  if (footerLines.length) out.push('', ...footerLines);
  out.push('', info.FOOTER);
  return out.join('\n');
}

module.exports = { STYLES, S, getStyleNo, getMode, infoBlock, card };
