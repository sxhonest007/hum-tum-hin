module.exports = {
  name: 'owner',
  alias: ['creator', 'dev'],
  execute: async ({ socket, msg, sender, number, config, fakevcard, loadUserConfigFromMongo }) => {
    try { await socket.sendMessage(sender, { react: { text: "👑", key: msg.key } }); } catch(e){}

    try {
      const text = `

 \`👑 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 👑\`

╭─ 🧑‍💼 𝐃𝐄𝐓𝐀𝐈𝐋𝐒
│
│ ✦ 𝐍𝐚𝐦𝐞 : ᴍʀ xᴅᴋɪɴɢ
│ ✦ 𝐀𝐠𝐞  : 20+
│ ✦ 𝐍𝐨.  : +263714757857
│
╰────────✧

`.trim();

      const buttons = [
        { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "📜 ᴍᴇɴᴜ" }, type: 1 },
      ];

      await socket.sendMessage(sender, {
        text,
        footer: "👑 𝘖𝘸𝘯𝘦𝘳 𝘐𝘯𝘧𝘰𝘳𝘮𝘢𝘵𝘪𝘰𝘯",
        buttons
      }, { quoted: fakevcard });

    } catch (err) {
      console.error('owner command error:', err);
      try { await socket.sendMessage(sender, { text: '❌ Failed to show owner info.' }, { quoted: msg }); } catch(e){}
    }
  }
};
