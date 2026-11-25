const channelInfo = {};

async function tagAllCommand(sock, chatId, senderId, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: `╔═════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╚═════════════════════╝\n\n❌ *Uniquement dans les groupes !*`,
                contextInfo: channelInfo
            }, { quoted: message });
        }

        const groupMeta = await sock.groupMetadata(chatId);
        const participants = groupMeta.participants;

        if (!participants || participants.length === 0) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Aucun membre trouvé.*`,
                contextInfo: channelInfo
            });
        }

        const groupName = groupMeta.subject || 'Groupe';
        const mentions = participants.map(p => p.id);
        const admins = participants.filter(p => p.admin).length;
        const members = participants.length - admins;
        const total = participants.length;

        // Construire la liste des membres
        let memberList = '';
        participants.forEach((p, i) => {
            const role = p.admin === 'superadmin' ? '👑' : p.admin === 'admin' ? '⭐' : '👤';
            memberList += `│ ${role} @${p.id.split('@')[0]}\n`;
        });

        const caption = `╔═════════════════════╗
║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║
╠═════════════════════╣
║     📢 *TAGALL*            ║
╚═════════════════════╝

🥷────────────────🥷
『 *${groupName}* 』
🥷────────────────🥷

┌─────────────────────
│ 👥 *Total   :* ${total} membres
│ 👑 *Admins  :* ${admins}
│ 👤 *Membres :* ${members}
└─────────────────────

🔔 *Membres tagués :*
┌─────────────────────
${memberList}└─────────────────────

🥷───────────────🥷
  ⚡ *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* ⚡
   _propulsé par_ *𝗜𝗕𝗦𝗔𝗖𝗞𝗢™_
🥷───────────────🥷`;

        await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption,
            mentions,
            contextInfo: channelInfo
        }, { quoted: message });

    } catch (e) {
        console.error('❌ [tagall]', e.message);
        await sock.sendMessage(chatId, {
            text: `❌ *Erreur lors du tagall.*`,
            contextInfo: channelInfo
        }, { quoted: message });
    }
}

module.exports = tagAllCommand;
