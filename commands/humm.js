// humm.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀
// Silencieux : récupère une « vue unique » et l'envoie directement dans le PV
// de la personne qui tape la commande. Rien n'est affiché dans la discussion.
const { extractMedia, sendMediaToPV } = require('../lib/viewonce');

async function hummCommand(sock, chatId, pvJid, quotedMessage) {
  const media = extractMedia(quotedMessage, { onlyViewOnce: true });
  if (!media) return; // pas une vue unique → silence total
  try {
    await sendMediaToPV(sock, pvJid, media, '🤫 *Vue unique récupérée (humm)*');
  } catch (e) {
    console.error('❌ [humm]', e.message);
  }
}

module.exports = hummCommand;
