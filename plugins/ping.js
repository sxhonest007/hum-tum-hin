module.exports = {
  name: 'ping',
  alias: ['speed'],
  execute: async ({ socket, msg, sender, number, config, fakevcard, loadUserConfigFromMongo, fs }) => {
    try {
      const sanitized = (number || '').replace(/[^0-9]/g, '');
      const cfg = await loadUserConfigFromMongo(sanitized) || {};
      const botName = cfg.botName || 'ғʀᴇᴇ-ᴍɪɴɪ';
      const logo = cfg.logo || "https://files.catbox.moe/sb24ud.jpg";

      const latency = Date.now() - (msg.messageTimestamp * 1000 || Date.now());

      const text = `
*📡 ${botName} ᴘɪɴɢ ɴᴏᴡ*

*◈ 🛠️ 𝐋atency :* ${latency}ms
*◈ 🕢 𝐒erver 𝐓ime :* ${new Date().toLocaleString()}
`;

      let imagePayload;
      if (String(logo).startsWith('http')) imagePayload = { url: logo };
      else {
        try { imagePayload = fs.readFileSync(logo); } catch(e){ imagePayload = { url: logo }; }
      }

      await socket.sendMessage(sender, {
        image: imagePayload,
        caption: text,
        footer: `*${botName} ᴘɪɴɢ*`,
        buttons: [{ buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "📜 ᴍᴇɴᴜ" }, type: 1 }],
        headerType: 4
      }, { quoted: fakevcard });

    } catch(e) {
      console.error('ping error', e);
      await socket.sendMessage(sender, { text: '❌ Failed to get ping.' }, { quoted: msg });
    }
  }
};

