const channelInfo = {};

async function groupInfoCommand(sock, chatId, message) {
    if (!chatId.endsWith('@g.us')) {
        return await sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*', contextInfo: channelInfo }, { quoted: message });
    }

    try {
        const meta = await sock.groupMetadata(chatId);
        const participants = meta.participants;
        const total = participants.length;
        const admins = participants.filter(p => p.admin);
        const members = total - admins.length;
        const created = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString('fr-FR') : 'Inconnu';

        let adminList = '';
        admins.forEach((p, i) => {
            const role = p.admin === 'superadmin' ? '👑' : '⭐';
            adminList += `│ ${role} @${p.id.split('@')[0]}\n`;
        });

        const caption = `
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ┃
┗━━━━━━━━━━━━━━━━━━━━━━┛

📊 *INFOS DU GROUPE*
━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────
│ 👥 *Nom      :* ${meta.subject}
│ 📅 *Créé le  :* ${created}
│ 🆔 *JID      :* ${chatId.split('@')[0]}
└─────────────────────

━━━━━━━━━━━━━━━━━━━━━━
📈 *Statistiques :*
┌─────────────────────
│ 👤 *Membres  :* ${members}
│ 👑 *Admins   :* ${admins.length}
│ 📊 *Total    :* ${total}
│ 🔒 *Fermé   :* ${meta.announce ? 'Oui' : 'Non'}
└─────────────────────

━━━━━━━━━━━━━━━━━━━━━━
👑 *Admins du groupe :*
┌─────────────────────
${adminList}└─────────────────────

📝 *Description :*
┌─────────────────────
│ ${meta.desc || 'Aucune description'}
└─────────────────────

> _Propulsé par 🥷 *CENTRAL-HEX*_`.trim();

        await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption,
            mentions: admins.map(a => a.id),
            contextInfo: channelInfo
        }, { quoted: message });

    } catch (e) {
        console.error('❌ [groupinfo]', e.message);
        await sock.sendMessage(chatId, { text: '❌ Impossible de récupérer les infos du groupe.', contextInfo: channelInfo }, { quoted: message });
    }
}

module.exports = groupInfoCommand;
