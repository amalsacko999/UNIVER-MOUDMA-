// help.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : .help  /  .help <commande>
const info = require('../lib/botinfo');
const ui = require('../lib/ui');
const catalog = require('../lib/catalog');
const HELP = require('../lib/helpdata');

function similar(name) {
  const k = name.toLowerCase();
  return catalog.allNames()
    .filter(n => n.startsWith(k.slice(0, 2)) || n.includes(k) || k.includes(n))
    .slice(0, 6);
}

async function helpCommand(sock, chatId, message, args = [], prefix = '.') {
  const wanted = args.join(' ').trim();
  const s = ui.S();

  // ── .help seul : guide général ──
  if (!wanted) {
    const text = [
      s.head(info.STYLED_NAME),
      s.row('*📖 ᴀɪᴅᴇ*', '').replace(/ : $/, ''),
      s.foot,
      '',
      `📌 *Comment utiliser le bot*`,
      `• Écris *${prefix}menu* pour voir toutes les commandes.`,
      `• Écris *${prefix}help <commande>* pour comprendre une commande en détail.`,
      `   ↳ exemple : *${prefix}help stiker*`,
      `• Les commandes commencent par *${prefix}* (sauf *humm*, *waouh* et *save*).`,
      `• *stiker, take, save, waouh, humm, setpp* : réponds d'abord au message concerné.`,
      `• Commandes de groupe : le bot doit être *admin* du groupe pour agir.`,
      `• *${prefix}mode public / private* : choisis qui peut utiliser le bot.`,
      '',
      `👑 Propriétaire : *${info.OWNER.name}*`,
      `🛠️ Créateurs : *${info.CREATORS.map(c => c.name).join(' & ')}*`,
      '',
      info.FOOTER,
    ].join('\n');
    return sock.sendMessage(chatId, { text }, { quoted: message });
  }

  // ── .help <commande> ──
  const name = catalog.resolve(wanted);
  const data = name && HELP[name];
  if (!data) {
    const near = similar(wanted.replace(/^[.!\/#]/, ''));
    return sock.sendMessage(chatId, {
      text: `❓ *Commande « ${wanted} » introuvable.*` +
        (near.length ? `\n\nTu voulais dire : ${near.map(n => '*' + prefix + n + '*').join(', ')} ?` : '') +
        `\n\n📋 Écris *${prefix}menu* pour voir toutes les commandes.\n\n${info.FOOTER}`,
    }, { quoted: message });
  }

  const [desc, usage, example] = data;
  const text = [
    s.head(`📖 AIDE · ${name.toUpperCase()}`),
    s.foot,
    '',
    `📝 *Description*`,
    desc,
    '',
    `⌨️ *Utilisation*`,
    usage,
    '',
    `💡 *Exemple*`,
    example.startsWith('.') || /^(waouh|humm|save)$/.test(example) ? example : prefix + example,
    '',
    `👥 *Accès* : tout le monde peut l'utiliser`,
    '',
    `📋 _${prefix}menu pour toutes les commandes_`,
    info.FOOTER,
  ].join('\n');
  await sock.sendMessage(chatId, { text }, { quoted: message });
}

module.exports = helpCommand;
