// mode.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : .mode public / private
const fs = require('fs');
const path = require('path');
const ui = require('../lib/ui');

const FILE = path.join(__dirname, '../data/messageCount.json');

function read() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); } catch { return { isPublic: true, messageCount: {} }; }
}

async function modeCommand(sock, chatId, message, args) {
  const data = read();
  const current = data.isPublic === false ? 'privé' : 'public';
  const action = (args[0] || '').toLowerCase();
  const aliases = { public: true, publique: true, private: false, prive: false, privé: false };

  if (!(action in aliases)) {
    return sock.sendMessage(chatId, {
      text: ui.card('⚙️ MODE DU BOT', [
        ['*Mode actuel*', current],
        ['*.mode public*', 'tout le monde'],
        ['*.mode private*', 'propriétaire seul'],
      ]),
    }, { quoted: message });
  }

  data.isPublic = aliases[action];
  try {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    await sock.sendMessage(chatId, {
      text: ui.card('⚙️ MODE DU BOT', [
        ['*Nouveau mode*', data.isPublic ? 'public 🌍' : 'privé 🔒'],
        data.isPublic ? 'Tout le monde peut utiliser le bot.' : 'Seul le propriétaire peut utiliser le bot.',
      ]),
    }, { quoted: message });
  } catch (e) {
    await sock.sendMessage(chatId, { text: '❌ Impossible de changer le mode.' }, { quoted: message });
  }
}

module.exports = modeCommand;
