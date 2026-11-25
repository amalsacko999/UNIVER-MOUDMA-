// Gjid → Donne l'identifiant JID du groupe
const channelInfo = {};

async function gjidCommand(sock, chatId, message) {
    const isGroup = chatId.endsWith('@g.us');
    const isChannel = chatId.endsWith('@newsletter');

    if (!isGroup && !isChannel) {
        return await sock.sendMessage(chatId, {
            text: `╔══════════════════════╗\n║   🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀* 🥷   ║\n╚══════════════════════╝\n\n❌ *Uniquement dans un groupe ou une chaîne !*`,
            contextInfo: channelInfo
        }, { quoted: message });
    }

    if (isChannel) {
        return await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption: `╔═══════════════════════╗\n║  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ║\n╠═══════════════════════╣\n║   🆔 *JID DE LA CHAÎNE*   ║\n╚═══════════════════════╝\n\n🆔 *Identifiant (JID) :*\n┌──────────────────────\n│ \`\`\`${chatId}\`\`\`\n└──────────────────────\n\n> _Copie le JID ci-dessus_\n> _Propulsé par 🥷 CENTRAL-HEX_`,
            contextInfo: channelInfo
        }, { quoted: message });
    }

    try {
        const meta = await sock.groupMetadata(chatId);
        const created = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString('fr-FR') : 'Inconnu';

        await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption: `╔═══════════════════════╗\n║  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ║\n╠═══════════════════════╣\n║   🆔 *JID DU GROUPE*      ║\n╚═══════════════════════╝\n\n👥 *Groupe :* ${meta.subject}\n📅 *Créé le :* ${created}\n👤 *Membres :* ${meta.participants.length}\n\n🆔 *Identifiant (JID) :*\n┌──────────────────────\n│ \`\`\`${chatId}\`\`\`\n└──────────────────────\n\n> _Copie le JID ci-dessus_\n> _Propulsé par 🥷 CENTRAL-HEX_`,
            contextInfo: channelInfo
        }, { quoted: message });
    } catch (e) {
        console.error('❌ [gjid]', e.message);
        await sock.sendMessage(chatId, {
            text: `🆔 *JID du groupe :*\n\`\`\`${chatId}\`\`\``,
            contextInfo: channelInfo
        }, { quoted: message });
    }
}

module.exports = gjidCommand;
