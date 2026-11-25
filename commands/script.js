// script.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : liens officiels
const info = require('../lib/botinfo');
const ui = require('../lib/ui');

async function scriptCommand(sock, chatId, message) {
  const caption = ui.card('📦 SCRIPT DU BOT', [
    ['*Bot*', info.BOT_NAME],
    ['*Système*', info.SYSTEM],
    ['*Version*', info.VERSION],
    ['*Créateurs*', info.CREATORS.map(c => c.name).join(' & ')],
    ['*Propriétaire*', info.OWNER.name],
  ], [`📢 *Chaîne officielle :*`, info.CHANNEL]);
  try {
    await sock.sendMessage(chatId, { image: { url: info.IMAGE }, caption }, { quoted: message });
  } catch {
    await sock.sendMessage(chatId, { text: caption }, { quoted: message });
  }
}

module.exports = scriptCommand;
