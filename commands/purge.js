// purge.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : supprime les derniers messages mémorisés du groupe
const ui = require('../lib/ui');
const recent = require('../lib/recent');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function purgeCommand(sock, chatId, senderId, args, message) {
  if (!chatId.endsWith('@g.us')) {
    return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
  }
  const n = Math.min(Math.max(parseInt(args[0], 10) || 10, 1), recent.MAX);
  const keys = recent.last(sock, chatId, n + 1); // +1 : le message de la commande lui-même
  let done = 0, failed = 0;

  await sock.sendMessage(chatId, { react: { text: '🧹', key: message.key } }).catch(() => {});
  for (const key of keys) {
    try {
      await sock.sendMessage(chatId, { delete: key });
      done++;
      await sleep(350);
    } catch { failed++; }
  }

  await sock.sendMessage(chatId, {
    text: ui.card('🧹 PURGE', [
      ['*Demandés*', String(n)],
      ['*Supprimés*', String(done)],
      failed ? ['*Échecs*', `${failed} (le bot doit être admin)`] : 'Chat nettoyé ✅',
    ]),
  });
}

module.exports = purgeCommand;
