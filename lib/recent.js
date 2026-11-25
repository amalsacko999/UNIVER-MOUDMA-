// recent.js — mémorise les derniers messages d'une discussion (utilisé par .purge)
const MAX = 60;
const buckets = new Map();

function keyOf(sock, chatId) { return `${sock.user?.id || 'bot'}|${chatId}`; }

function track(sock, message) {
  try {
    const chatId = message.key?.remoteJid;
    if (!chatId || chatId === 'status@broadcast') return;
    const k = keyOf(sock, chatId);
    const arr = buckets.get(k) || [];
    arr.push(message.key);
    if (arr.length > MAX) arr.splice(0, arr.length - MAX);
    buckets.set(k, arr);
  } catch {}
}

function last(sock, chatId, n) {
  const arr = buckets.get(keyOf(sock, chatId)) || [];
  return arr.slice(-n).reverse();
}

module.exports = { track, last, MAX };
