// viewonce.js — extraction / envoi des médias (vue unique incluse) vers le PV de l'utilisateur
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const info = require('./botinfo');

const KINDS = [['imageMessage', 'image'], ['videoMessage', 'video'], ['audioMessage', 'audio']];

// Déballe les différentes enveloppes « vue unique » utilisées par WhatsApp
function unwrap(q) {
  if (!q) return { msg: null, wrapped: false };
  const inner =
    q.viewOnceMessageV2?.message ||
    q.viewOnceMessageV2Extension?.message ||
    q.viewOnceMessage?.message ||
    null;
  const base = inner || q;
  const eph = base.ephemeralMessage?.message;
  return { msg: eph || base, wrapped: !!inner };
}

// Retourne { type, content, viewOnce } ou null
// onlyViewOnce = true → refuse les médias normaux (humm / waouh)
function extractMedia(quoted, { onlyViewOnce = false } = {}) {
  const { msg, wrapped } = unwrap(quoted);
  if (!msg) return null;
  for (const [key, type] of KINDS) {
    const c = msg[key];
    if (!c) continue;
    const isVO = wrapped || !!c.viewOnce;
    if (onlyViewOnce && !isVO) return null;
    return { type, content: c, viewOnce: isVO };
  }
  return null;
}

async function toBuffer(content, type) {
  const stream = await downloadContentFromMessage(content, type);
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// Envoie le média dans le PV (pvJid) — jamais dans la discussion d'origine
async function sendMediaToPV(sock, pvJid, media, label = '👁️ *Vue unique récupérée*') {
  const { type, content } = media;
  const buf = await toBuffer(content, type);
  const caption = `${label}${content.caption ? `\n\n${content.caption}` : ''}\n\n${info.FOOTER}`;
  if (type === 'image') return sock.sendMessage(pvJid, { image: buf, caption });
  if (type === 'video') return sock.sendMessage(pvJid, { video: buf, caption, mimetype: content.mimetype || 'video/mp4' });
  return sock.sendMessage(pvJid, { audio: buf, mimetype: content.mimetype || 'audio/mp4', ptt: !!content.ptt });
}

module.exports = { unwrap, extractMedia, toBuffer, sendMediaToPV };
