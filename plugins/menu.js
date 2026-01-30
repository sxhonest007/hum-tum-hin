module.exports = {
  name: 'menu',
  alias: ['help', 'commands'],
  execute: async ({ socket, msg, from, sender, number, config, fakevcard, loadUserConfigFromMongo, socketCreationTime, fs }) => {
    try { await socket.sendMessage(sender, { react: { text: "🎐", key: msg.key } }); } catch(e){}

    try {
      const startTime = socketCreationTime.get(number) || Date.now();
      const uptime = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      let userCfg = {};
      try { if (number && typeof loadUserConfigFromMongo === 'function') userCfg = await loadUserConfigFromMongo((number || '').replace(/[^0-9]/g, '')) || {}; }
      catch(e){ userCfg = {}; }

      const title = userCfg.botName || '©ғʀᴇᴇ ᴍɪɴɪ ';
      
      const text = `
╭────────￫
│  • ɴᴀᴍᴇ ${title}                        
│  • ᴏᴡɴᴇʀ: ${config.OWNER_NAME || 'ᴍʀ xᴅᴋɪɴɢ'}            
│  • ᴠᴇʀsɪᴏɴ: ${config.BOT_VERSION || '0.1+'}             
│  • ᴘʟᴀᴛғᴏʀᴍ: ${process.env.PLATFORM || 'Heroku'}           
│  • ᴜᴘᴛɪᴍᴇ: ${hours}h ${minutes}m ${seconds}s                
╰────────￫
╭────────￫
│  🔧ғᴇᴀᴛᴜʀᴇs                  
│  [1] 👑 ᴏᴡɴᴇʀ                           
│  [2]..ᴄᴏᴍɪɴɢ sᴏᴏɴ⤵️                           
│  [3]...                            
│  [4]..                       
│  [5]...                               
╰───────￫

🎯 ᴛᴀᴘ ᴀ ᴄᴀᴛᴇɢᴏʀʏ ʙᴇʟᴏᴡ!

`.trim();

      const buttons = [
        { buttonId: `${config.PREFIX}owner`, buttonText: { displayText: "👑 ᴏᴡɴᴇʀ" }, type: 1 }
      ];

      const defaultImg = "https://files.catbox.moe/sb24ud.jpg";
      const useLogo = userCfg.logo || defaultImg;

      let imagePayload;
      if (String(useLogo).startsWith('http')) imagePayload = { url: useLogo };
      else {
        try { imagePayload = fs.readFileSync(useLogo); } catch(e){ imagePayload = { url: defaultImg }; }
      }

      await socket.sendMessage(sender, {
        image: imagePayload,
        caption: text,
        footer: "*▶ ● 𝐅𝚁𝙴𝙴 𝐁𝙾𝚃 *",
        buttons,
        headerType: 4
      }, { quoted: fakevcard });

    } catch (err) {
      console.error('menu command error:', err);
      try { await socket.sendMessage(sender, { text: '❌ Failed to show menu.' }, { quoted: msg }); } catch(e){}
    }
  }
};
