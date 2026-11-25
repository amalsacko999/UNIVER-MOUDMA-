// menu.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : .menu et .all-menu
const fs = require('fs');
const path = require('path');
const info = require('../lib/botinfo');
const ui = require('../lib/ui');
const { CATEGORIES } = require('../lib/catalog');

function getMenuImage() {
  try {
    const url = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menuimage.json'), 'utf-8')).url;
    return url && url.startsWith('http') ? url : info.IMAGE;
  } catch { return info.IMAGE; }
}

async function send(sock, chatId, message, caption) {
  try {
    await sock.sendMessage(chatId, { image: { url: getMenuImage() }, caption }, { quoted: message });
  } catch (e) {
    // si l'image est inaccessible, on envoie quand même le menu en texte
    await sock.sendMessage(chatId, { text: caption }, { quoted: message });
  }
}

// ── .menu : infos du bot + chaque commande avec sa description ──
async function menuCommand(sock, chatId, message, prefix = '.') {
  const s = ui.S();
  const parts = [ui.infoBlock(message.pushName, prefix), ''];
  for (const cat of CATEGORIES) {
    parts.push(s.catHead(cat.icon, cat.title));
    for (const [name, desc] of cat.cmds) parts.push(s.catRow(prefix + name, desc));
    if (s.catFoot) parts.push(s.catFoot);
    parts.push('');
  }
  parts.push(`💡 *${prefix}help <commande> pour l'aide*`, '', info.FOOTER);
  await send(sock, chatId, message, parts.join('\n'));
}

// ── .all-menu : liste compacte (noms seulement) ──
async function allMenuCommand(sock, chatId, message, prefix = '.') {
  const s = ui.S();
  const parts = [ui.infoBlock(message.pushName, prefix), ''];
  for (const cat of CATEGORIES) {
    parts.push(s.catHead(cat.icon, cat.title));
    parts.push(cat.cmds.map(([n]) => prefix + n).join('  '));
    if (s.catFoot) parts.push(s.catFoot);
    parts.push('');
  }
  parts.push(`💡 *${prefix}help <commande> pour l'aide*`, `📋 *${prefix}menu* pour les descriptions`, '', info.FOOTER);
  await send(sock, chatId, message, parts.join('\n'));
}

module.exports = { menuCommand, allMenuCommand };
