// Open → Ouvre le groupe (tout le monde peut écrire)
const isAdmin = require('../lib/isAdmin');

const channelInfo = {};

async function openCommand(sock, chatId, senderId, message) {
    if (!chatId.endsWith('@g.us')) {
        return await sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*', contextInfo: channelInfo }, { quoted: message });
    }

    try {
        // Déverrouille le groupe : tout le monde peut envoyer
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        const meta = await sock.groupMetadata(chatId);

        await sock.sendMessage(chatId, {
            image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
            caption: `╔═══════════════════════╗\n║  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ║\n╠═══════════════════════╣\n║   🔓 *GROUPE OUVERT*     ║\n╚═══════════════════════╝\n\n👥 *${meta.subject}*\n\n┌──────────────────────\n│ 🔓 Statut : *Ouvert*\n│ 🌍 Tout le monde peut écrire\n│ 📅 Ouvert par @${senderId.split('@')[0]}\n└──────────────────────\n\n> _Pour fermer : .close_\n> _Propulsé par 🥷 CENTRAL-HEX_`,
            mentions: [senderId],
            contextInfo: channelInfo
        }, { quoted: message });
    } catch (e) {
        console.error('❌ [open]', e.message);
        await sock.sendMessage(chatId, { text: '❌ *Impossible d\'ouvrir le groupe.*\n_Vérifiez les permissions du bot._', contextInfo: channelInfo }, { quoted: message });
    }
}

module.exports = openCommand;
