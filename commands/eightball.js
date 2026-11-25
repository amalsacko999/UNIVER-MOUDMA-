const eightBallResponses = [
    "Yes, definitely!",
    "No way!",
    "Ask again later.",
    "It is certain.",
    "Very doubtful.",
    "Without a doubt.",
    "My reply is no.",
    "Signs point to yes."
];

async function eightBallCommand(sock, chatId, question) {
    if (!question) {
        await sock.sendMessage(chatId, { text: '🎱 *Pose-moi une question !*\nEx : .8ball Vais-je réussir ?' });
        return;
    }

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    await sock.sendMessage(chatId, { text: `╔═✦𝐔𝐍𝐈𝐕𝐄𝐑-𝐌𝐎𝐔𝐃𝐌𝐀✦═══✰\n║»✰ 🎱 *Boule magique*\n║»✰ ❓ ${question}\n║»✰ 💬 ${randomResponse}\n╚═══════════════════✰\n\n> 🥷 _by CENTRAL-HEX_` });
}

module.exports = { eightBallCommand };
