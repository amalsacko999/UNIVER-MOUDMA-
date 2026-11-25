// owner.js — 𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 : créateurs, propriétaire et système
const info = require('../lib/botinfo');
const ui = require('../lib/ui');

function vcard(name, number) {
  return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info.BOT_NAME};\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`;
}

async function ownerCommand(sock, chatId, message) {
  const s = ui.S();
  const [c1, c2] = info.CREATORS;
  const caption = [
    s.head(info.STYLED_NAME),
    s.row('*ʙᴏᴛ ɴᴀᴍᴇ*', info.BOT_NAME),
    s.row('*sʏsᴛèᴍᴇ*', info.SYSTEM),
    s.foot,
    '',
    '🛠️ *LE BOT A ÉTÉ CRÉÉ PAR*',
    s.catHead('', 'CRÉATEURS').replace('  ', ' '),
    s.catRow('👤 ' + c1.name, ''),
    s.catRow('📞 Contact : +' + c1.number, ''),
    s.catRow('👤 ' + c2.name, ''),
    s.catRow('📞 Contact : +' + c2.number, ''),
    s.catFoot,
    '',
    '👑 *PROPRIÉTAIRE*',
    s.catHead('', 'PROPRIÉTAIRE').replace('  ', ' '),
    s.catRow('👤 ' + info.OWNER.name, ''),
    s.catRow('📞 Contact : +' + info.OWNER.number, ''),
    s.catFoot,
    '',
    `🌐 *DANS LE SYSTÈME* : *${info.SYSTEM}*`,
    `📢 ${info.CHANNEL}`,
    '',
    '📲 _Les fiches de contact arrivent juste après_ 👇',
    '',
    info.FOOTER,
  ].filter(l => l !== undefined).join('\n');

  try {
    await sock.sendMessage(chatId, { image: { url: info.IMAGE }, caption }, { quoted: message });
  } catch {
    await sock.sendMessage(chatId, { text: caption }, { quoted: message });
  }

  try {
    await sock.sendMessage(chatId, {
      contacts: {
        displayName: info.BOT_NAME,
        contacts: [
          { vcard: vcard(c1.name + ' (créateur)', c1.number) },
          { vcard: vcard(c2.name + ' (créateur)', c2.number) },
          { vcard: vcard(info.OWNER.name + ' (propriétaire)', info.OWNER.number) },
        ],
      },
    });
  } catch (e) {
    console.error('❌ [owner] contacts:', e.message);
  }
}

module.exports = ownerCommand;
