// save.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀
// Sauvegarde le message cité dans le PV de la personne qui tape la commande.
// Gère : texte, image, vidéo, audio, sticker, document ET médias en vue unique.
const info = require('../lib/botinfo');
const ui = require('../lib/ui');
const { unwrap, extractMedia, sendMediaToPV, toBuffer } = require('../lib/viewonce');

async function react(sock, chatId, message, emoji) {
  try { await sock.sendMessage(chatId, { react: { text: emoji, key: message.key } }); } catch {}
}

async function saveCommand(sock, chatId, pvJid, quotedMessage, message) {
  if (!quotedMessage) {
    return sock.sendMessage(chatId, {
      text: ui.card('💾 SAVE', [
        'Sauvegarde un message dans ton PV',
        ['*Usage*', 'réponds à un message avec save'],
        ['*Types*', 'texte, image, vidéo, audio, sticker, vue unique'],
      ]),
    }, { quoted: message });
  }

  try {
    // 1) image / vidéo / audio (vue unique comprise)
    const media = extractMedia(quotedMessage);
    if (media) {
      await sendMediaToPV(sock, pvJid, media, media.viewOnce ? '💾 *Vue unique sauvegardée*' : '💾 *Média sauvegardé*');
      return react(sock, chatId, message, '✅');
    }

    const { msg } = unwrap(quotedMessage);

    // 2) sticker
    if (msg?.stickerMessage) {
      const buf = await toBuffer(msg.stickerMessage, 'sticker');
      await sock.sendMessage(pvJid, { sticker: buf });
      return react(sock, chatId, message, '✅');
    }

    // 3) document
    if (msg?.documentMessage) {
      const d = msg.documentMessage;
      const buf = await toBuffer(d, 'document');
      await sock.sendMessage(pvJid, { document: buf, mimetype: d.mimetype, fileName: d.fileName || 'fichier' });
      return react(sock, chatId, message, '✅');
    }

    // 4) texte
    const text = msg?.conversation || msg?.extendedTextMessage?.text;
    if (text) {
      await sock.sendMessage(pvJid, { text: `💾 *Message sauvegardé*\n\n${text}\n\n${info.FOOTER}` });
      return react(sock, chatId, message, '✅');
    }

    await sock.sendMessage(chatId, { text: '❌ *Type de message non supporté.*' }, { quoted: message });
  } catch (e) {
    console.error('❌ [save]', e.message);
    await react(sock, chatId, message, '❌');
  }
}

module.exports = saveCommand;
