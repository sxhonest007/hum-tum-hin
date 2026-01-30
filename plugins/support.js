module.exports = {
  name: 'support',
  alias: ['channel'],
  execute: async ({ socket, msg, sender, config, fakevcard }) => {
    const support = config.SUPPORT_NEWSLETTER;
    
    const message = `*🤝 SUPPORT THE DEVELOPER*\n\n` +
                    `If you appreciate this free bot, please add my newsletter:\n\n` +
                    `📢 *${support.name}*\n` +
                    `🔗 ${support.jid}\n` +
                    `📝 ${support.description}\n\n` +
                    `*How to add:*\n` +
                    `1. Edit \`pair.js\`\n` +
                    `2. Find \`DEFAULT_NEWSLETTERS\`\n` +
                    `3. Add this to the array:\n\n` +
                    `\`\`\`json\n` +
                    `{\n` +
                    `  jid: "${support.jid}",\n` +
                    `  emojis: ${JSON.stringify(support.emojis)},\n` +
                    `  name: "${support.name}",\n` +
                    `  description: "${support.description}"\n` +
                    `}\n` +
                    `\`\`\`\n\n` +
                    `*Thank you for your support!* 🙏`;
    
    await socket.sendMessage(sender, { text: message }, { quoted: fakevcard });
  }
};

