// jid.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : .jid (groupe, chaîne ou discussion privée)
const ui = require('../lib/ui');

async function jidCommand(sock, chatId, message) {
  const kind = chatId.endsWith('@g.us') ? '👥 Groupe' : chatId.endsWith('@newsletter') ? '📢 Chaîne' : '👤 Discussion privée';
  await sock.sendMessage(chatId, {
    text: ui.card('🆔 JID', [['*Type*', kind]], ['```' + chatId + '```']),
  }, { quoted: message });
}

module.exports = jidCommand;
