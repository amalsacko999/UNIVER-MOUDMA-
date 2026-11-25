require('dotenv').config();
// ═══════════════════════════════════════════════════════
//   𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀 — cœur du bot (système CENTRAL-HEX)
// ═══════════════════════════════════════════════════════
const fs = require('fs');
const path = require('path');

// Dossier temporaire local (évite les erreurs ENOSPC sur les hébergeurs)
const customTemp = path.join(process.cwd(), 'temp');
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;
setInterval(() => {
    fs.readdir(customTemp, (err, files) => {
        if (err) return;
        for (const f of files) {
            const p = path.join(customTemp, f);
            fs.stat(p, (e, st) => { if (!e && Date.now() - st.mtimeMs > 3 * 3600 * 1000) fs.unlink(p, () => { }); });
        }
    });
}, 3 * 3600 * 1000);

const settings = require('./settings');
require('./config.js');
const info = require('./lib/botinfo');
const ui = require('./lib/ui');
const recent = require('./lib/recent');
const isAdmin = require('./lib/isAdmin');
const isOwnerOrSudo = require('./lib/isOwner');
const { isBanned } = require('./lib/isBanned');
const { Antilink } = require('./lib/antilink');
const { handleBadwordDetection } = require('./lib/antibadword');
const { addCommandReaction } = require('./lib/reactions');

// ── Commandes ──
const helpCommand = require('./commands/help');
const { menuCommand, allMenuCommand } = require('./commands/menu');
const pingCommand = require('./commands/ping');
const ownerCommand = require('./commands/owner');
const weatherCommand = require('./commands/weather');
const attpCommand = require('./commands/attp');
const { eightBallCommand } = require('./commands/eightball');
const staffCommand = require('./commands/staff');
const waouhCommand = require('./commands/waouh');
const hummCommand = require('./commands/humm');
const saveCommand = require('./commands/save');
const { handleSsCommand } = require('./commands/ss');
const { sanctionCommand, uptimeCmdNew, testCmdNew, infoCmdNew, clanCommand, loiCommand } = require('./commands/nouvelles');
const purgeCommand = require('./commands/purge');
const openCommand = require('./commands/open');
const closeCommand = require('./commands/close');
const banCommand = require('./commands/ban');
const kickCommand = require('./commands/kick');
const kickallCommand = require('./commands/kickall');
const warnCommand = require('./commands/warn');
const { promoteCommand, handlePromotionEvent } = require('./commands/promote');
const { demoteCommand, handleDemotionEvent } = require('./commands/demote');
const muteCommand = require('./commands/mute');
const unmuteCommand = require('./commands/unmute');
const tagAllCommand = require('./commands/tagall');
const tagCommand = require('./commands/tag');
const hideTagCommand = require('./commands/hidetag');
const linkCommand = require('./commands/link');
const gstatusCommand = require('./commands/gstatus');
const { approveCommand, isApproved } = require('./commands/approve');
const totalmembersCommand = require('./commands/totalmembers');
const { handleAntilinkCommand } = require('./commands/antilink');
const antibadwordCommand = require('./commands/antibadword');
const { antibotCommand, isAntibotEnabled } = require('./commands/antibot');
const antimentionCommand = require('./commands/antimention');
const { handleAntimention } = require('./commands/antimention');
const antistickerCommand = require('./commands/antisticker');
const { handleAntisticker } = require('./commands/antisticker');
const { handleAntitagCommand, handleTagDetection } = require('./commands/antitag');
const { handleAntideleteCommand, handleMessageRevocation, storeMessage } = require('./commands/antidelete');
const modeCommand = require('./commands/mode');
const promptCommand = require('./commands/prompt');
const settingsCommand = require('./commands/settings');
const { anticallCommand } = require('./commands/anticall');
const setProfilePicture = require('./commands/setpp');
const stickerCommand = require('./commands/sticker');
const takeCommand = require('./commands/take');
const scriptCommand = require('./commands/script');
const jidCommand = require('./commands/jid');
const groupInfoCommand = require('./commands/groupinfo');
const gjidCommand = require('./commands/gjid');
const menustyleCommand = require('./commands/menustyle');
const songCommand = require('./commands/song');
const videoCommand = require('./commands/video');
const metaCommand = require('./commands/meta');

global.packname = settings.packname;
global.author = settings.author;
global.channelLink = info.CHANNEL;

const PREFIX = settings.prefix || '.';
const NO_PREFIX = ['humm', 'waouh', 'save']; // fonctionnent aussi sans préfixe (message exact)

// JID où envoyer les médias « privés » : le PV de la personne qui tape la commande
function resolvePv(sock, message) {
    if (message.key.fromMe) {
        const me = (sock.user?.id || '').split(':')[0].split('@')[0];
        return me + '@s.whatsapp.net';
    }
    const k = message.key;
    const cands = [k.participantAlt, k.participantPn, k.remoteJidAlt, k.participant, k.remoteJid];
    return cands.find(j => j && j.endsWith('@s.whatsapp.net')) || cands.find(Boolean);
}

function readIsPublic() {
    try {
        const d = JSON.parse(fs.readFileSync('./data/messageCount.json', 'utf-8'));
        return d.isPublic !== false;
    } catch { return true; }
}

async function handleMessages(sock, messageUpdate) {
    let chatId = null;
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;
        const message = messages[0];
        if (!message?.message) return;

        chatId = message.key.remoteJid;
        if (chatId === 'status@broadcast') return;

        const isGroup = chatId.endsWith('@g.us');
        const senderId = message.key.fromMe
            ? (sock.user?.id?.split(':')[0].split('@')[0] + '@s.whatsapp.net')
            : (message.key.participant || message.key.remoteJid);
        const pvJid = resolvePv(sock, message);

        // Mémoire des derniers messages (purge) + antidelete
        recent.track(sock, message);
        try { storeMessage(sock, message); } catch (e) { /* non critique */ }
        if (message.message?.protocolMessage?.type === 0) {
            try { await handleMessageRevocation(sock, message); } catch (e) { /* non critique */ }
            return;
        }

        const senderIsOwner = message.key.fromMe || await isOwnerOrSudo(senderId, sock, chatId);

        // Anti-bot : ignore les messages des autres bots
        if (isGroup && isAntibotEnabled(chatId)) {
            const looksBot = senderId.includes(':') && senderId.includes('@s.whatsapp.net') && !message.key.fromMe && !senderIsOwner;
            if (looksBot) return;
        }

        // ── Texte du message ──
        const rawText = (
            message.message.conversation ||
            message.message.extendedTextMessage?.text ||
            message.message.imageMessage?.caption ||
            message.message.videoMessage?.caption ||
            ''
        ).trim();

        // ── Détection de la commande ──
        let body = null;
        if (rawText.toLowerCase().startsWith(PREFIX.toLowerCase())) {
            body = rawText.slice(PREFIX.length).trimStart();
        } else if (NO_PREFIX.includes(rawText.toLowerCase())) {
            body = rawText;
        }
        const hasCommand = body !== null && body.length > 0;

        // Mode public / privé
        const isPublic = readIsPublic();
        if (hasCommand && !isPublic && !senderIsOwner) return;

        // Utilisateur banni du bot
        if (hasCommand && isBanned(senderId)) return;

        // ── Protections de groupe (toujours actives) ──
        if (isGroup) {
            const approved = isApproved(chatId, senderId);
            if (!approved) {
                try {
                    if (rawText) await handleBadwordDetection(sock, chatId, message, rawText.toLowerCase(), senderId);
                    await Antilink(message, sock);
                } catch (e) { /* non critique */ }
            }
            try {
                if (message.message?.stickerMessage && await handleAntisticker(sock, chatId, senderId, message)) return;
                const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                if (mentioned.length && await handleAntimention(sock, chatId, senderId, mentioned, message)) return;
            } catch (e) { /* non critique */ }
            if (!hasCommand) {
                try { await handleTagDetection(sock, chatId, message, senderId); } catch (e) { /* non critique */ }
            }
        }

        if (!hasCommand) return;

        // ── Décodage : commande + arguments (casse conservée) ──
        const cmd = body.split(/\s+/)[0].toLowerCase();
        const argsRaw = body.slice(cmd.length).trim();
        const args = argsRaw.split(/\s+/).filter(Boolean);
        const userMessage = ('.' + body).toLowerCase(); // forme normalisée attendue par certaines commandes
        const ctx = message.message?.extendedTextMessage?.contextInfo;
        const mentionedJids = ctx?.mentionedJid || [];
        const quoted = ctx?.quotedMessage || null;

        console.log(`📝 ${isGroup ? 'groupe' : 'privé'} › ${PREFIX}${cmd}`);

        let handled = true;
        switch (cmd) {
            // ───────── GÉNÉRAL ─────────
            case 'help': await helpCommand(sock, chatId, message, args, PREFIX); break;
            case 'menu': case 'bot': case 'list': await menuCommand(sock, chatId, message, PREFIX); break;
            case 'all-menu': case 'allmenu': case 'allcmd': await allMenuCommand(sock, chatId, message, PREFIX); break;
            case 'ping': await pingCommand(sock, chatId, message); break;
            case 'test': await testCmdNew(sock, chatId, message); break;
            case 'info': await infoCmdNew(sock, chatId, message); break;
            case 'uptime': await uptimeCmdNew(sock, chatId, message); break;
            case 'owner': await ownerCommand(sock, chatId, message); break;
            case 'script': case 'sc': case 'repo': case 'git': case 'github': await scriptCommand(sock, chatId, message); break;
            case 'loi': await loiCommand(sock, chatId, message); break;
            case 'meta': await metaCommand(sock, chatId, message); break;

            // ───────── GROUPE ─────────
            case 'staff': case 'admins': case 'listadmin':
                if (!isGroup) return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
                await staffCommand(sock, chatId, message); break;
            case 'groupe': case 'groupeinfo': case 'groupinfo': case 'infogp': case 'infogrupo':
                if (cmd === 'groupe' && (args[0] || '').toLowerCase() !== 'info') { handled = false; break; }
                if (!isGroup) return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
                await groupInfoCommand(sock, chatId, message); break;
            case 'totalmembres': case 'totalmembers': await totalmembersCommand(sock, chatId, message); break;
            case 'gstatuts': case 'gstatus': await gstatusCommand(sock, chatId, senderId, args, message); break;
            case 'jid': await jidCommand(sock, chatId, message); break;
            case 'gjid': await gjidCommand(sock, chatId, message); break;
            case 'clan': await clanCommand(sock, chatId, senderId, args, message); break;
            case 'link': await linkCommand(sock, chatId, senderId, args.map(a => a.toLowerCase()), message); break;

            // ───────── ADMINISTRATION ─────────
            case 'open': await openCommand(sock, chatId, senderId, message); break;
            case 'close': await closeCommand(sock, chatId, senderId, message); break;
            case 'mute': {
                const n = args[0] !== undefined ? parseInt(args[0], 10) : undefined;
                if (args[0] !== undefined && (isNaN(n) || n <= 0)) {
                    await sock.sendMessage(chatId, { text: '❌ *Durée invalide.*\nUtilise *.mute* ou *.mute <minutes>*' }, { quoted: message });
                } else await muteCommand(sock, chatId, senderId, message, n);
                break;
            }
            case 'unmute': await unmuteCommand(sock, chatId, senderId, message); break;
            case 'kick': await kickCommand(sock, chatId, senderId, mentionedJids, message); break;
            case 'kickall': await kickallCommand(sock, chatId, senderId, message); break;
            case 'ban': await banCommand(sock, chatId, message); break;
            case 'warn': await warnCommand(sock, chatId, senderId, mentionedJids, message); break;
            case 'sanction': await sanctionCommand(sock, chatId, senderId, args, message); break;
            case 'promote': await promoteCommand(sock, chatId, mentionedJids, message); break;
            case 'demote': await demoteCommand(sock, chatId, mentionedJids, message); break;
            case 'approve': await approveCommand(sock, chatId, senderId, mentionedJids, message, true, true); break;
            case 'purge': await purgeCommand(sock, chatId, senderId, args, message); break;

            // ───────── MENTIONS ─────────
            case 'tagall': await tagAllCommand(sock, chatId, senderId, message); break;
            case 'tag': await tagCommand(sock, chatId, senderId, argsRaw, quoted, message); break;
            case 'hidetag': await hideTagCommand(sock, chatId, senderId, argsRaw, quoted, message); break;

            // ───────── PROTECTIONS ─────────
            case 'antilink':
                if (!isGroup) return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
                await handleAntilinkCommand(sock, chatId, userMessage, senderId, true, message); break;
            case 'antibadword':
                if (!isGroup) return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
                await antibadwordCommand(sock, chatId, message, senderId, true); break;
            case 'antibot': await antibotCommand(sock, chatId, message, args.map(a => a.toLowerCase()), true); break;
            case 'antimention': await antimentionCommand(sock, chatId, senderId, args.map(a => a.toLowerCase()), message); break;
            case 'antistiker': case 'antisticker': await antistickerCommand(sock, chatId, senderId, args.map(a => a.toLowerCase()), message); break;
            case 'antitag':
                if (!isGroup) return sock.sendMessage(chatId, { text: '❌ *Uniquement dans les groupes !*' }, { quoted: message });
                await handleAntitagCommand(sock, chatId, userMessage, senderId, true, message); break;
            case 'antidelete': await handleAntideleteCommand(sock, chatId, message, args.join(' ').toLowerCase()); break;
            case 'anticall': await anticallCommand(sock, chatId, message, args.join(' ').toLowerCase()); break;

            // ───────── PARAMÈTRES ─────────
            case 'mode': await modeCommand(sock, chatId, message, args); break;
            case 'setting': case 'settings': await settingsCommand(sock, chatId, message); break;
            case 'prompt': await promptCommand(sock, chatId, senderId, args, message); break;
            case 'menustyle': await menustyleCommand(sock, chatId, senderId, args, message); break;
            case 'setpp': await setProfilePicture(sock, chatId, message); break;

            // ───────── MÉDIAS ─────────
            case 'stiker': case 'sticker': case 's': await stickerCommand(sock, chatId, message); break;
            case 'take': case 'steal': await takeCommand(sock, chatId, senderId, argsRaw ? argsRaw.split(' ') : [], message); break;
            case 'attp': await attpCommand(sock, chatId, message); break;
            case 'ss': case 'ssweb': case 'screenshot': await handleSsCommand(sock, chatId, message, argsRaw); break;
            case 'play': case 'song': case 'mp3': case 'ytmp3': await songCommand(sock, chatId, message); break;
            case 'video': case 'ytmp4': await videoCommand(sock, chatId, message); break;

            // ───────── VUE UNIQUE ─────────
            case 'waouh': await waouhCommand(sock, chatId, pvJid, quoted); break;
            case 'humm': case '🥷': await hummCommand(sock, chatId, pvJid, quoted); break;
            case 'save': await saveCommand(sock, chatId, pvJid, quoted, message); break;

            // ───────── DIVERS ─────────
            case 'weather':
                if (!argsRaw) {
                    await sock.sendMessage(chatId, { text: ui.card('🌦️ MÉTÉO', [['*Usage*', '.weather <ville>'], ['*Exemple*', '.weather Conakry']]) }, { quoted: message });
                } else await weatherCommand(sock, chatId, message, argsRaw);
                break;
            case '8ball': await eightBallCommand(sock, chatId, argsRaw); break;

            default: handled = false;
        }

        if (handled && !NO_PREFIX.includes(cmd)) {
            try { await addCommandReaction(sock, message); } catch (e) { /* non critique */ }
        }
    } catch (error) {
        console.error('❌ Erreur dans le gestionnaire de messages:', error.message);
        if (chatId) {
            try { await sock.sendMessage(chatId, { text: '❌ *Une erreur est survenue.* Réessaie dans un instant.' }); } catch (e) { /* ignore */ }
        }
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action, author } = update;
        if (!id.endsWith('@g.us')) return;
        if (!readIsPublic()) return;
        if (action === 'promote') await handlePromotionEvent(sock, id, participants, author);
        else if (action === 'demote') await handleDemotionEvent(sock, id, participants, author);
    } catch (error) {
        console.error('Erreur handleGroupParticipantUpdate:', error.message);
    }
}

module.exports = { handleMessages, handleGroupParticipantUpdate };
