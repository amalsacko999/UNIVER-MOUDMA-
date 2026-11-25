const isAdmin = require('../lib/isAdmin');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

const channelInfo = {};

async function downloadMedia(msg, type) {
    const stream = await downloadContentFromMessage(msg, type);
    let buf = Buffer.from([]);
    for await (const chunk of stream) buf = Buffer.concat([buf, chunk]);
    return buf;
}

async function tagCommand(sock, chatId, senderId, messageText, replyMessage, message) {
    if (!chatId.endsWith('@g.us')) {
        return await sock.sendMessage(chatId, {
            text: `❌ *Uniquement dans les groupes !*`, contextInfo: channelInfo
        }, { quoted: message });
    }

    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);



    const groupMeta = await sock.groupMetadata(chatId);
    const participants = groupMeta.participants;
    const mentions = participants.map(p => p.id);
    const count = participants.length;

    const tagText = messageText || `╔═══════════════════════╗\n║  🥷 *𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 v1.0* 🥷  ║\n╠═══════════════════════╣\n║     📢 *ANNONCE*         ║\n╚═══════════════════════╝\n\n👥 *${groupMeta.subject}*\n🔔 *${count} membres tagués*\n\n> _Propulsé par 🥷 CENTRAL-HEX_`;

    try {
        if (replyMessage) {
            if (replyMessage.imageMessage) {
                const buf = await downloadMedia(replyMessage.imageMessage, 'image');
                await sock.sendMessage(chatId, { image: buf, caption: tagText, mentions }, { quoted: message });
            } else if (replyMessage.videoMessage) {
                const buf = await downloadMedia(replyMessage.videoMessage, 'video');
                await sock.sendMessage(chatId, { video: buf, caption: tagText, mentions }, { quoted: message });
            } else {
                await sock.sendMessage(chatId, {
                    image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
                    caption: tagText, mentions
                }, { quoted: message });
            }
        } else {
            await sock.sendMessage(chatId, {
                image: { url: 'https://i.ibb.co/LzNM7yyD/IMG-20261124-WA0178.jpg' },
                caption: tagText, mentions,
                contextInfo: channelInfo
            }, { quoted: message });
        }
    } catch (e) {
        console.error('❌ [tag]', e.message);
        await sock.sendMessage(chatId, { text: tagText, mentions }, { quoted: message });
    }
}

module.exports = tagCommand;
