import { EmbedBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'ping',
  description: 'عرض ping البوت',
  async execute(message, args, client) {
    const msg = await message.reply({ content: '🔄 جاري الحساب...' });

    const apiPing = client.ws.ping;
    const messagePing = msg.createdTimestamp - message.createdTimestamp;

    const pingEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('🏓 Ping!')
      .addFields(
        { name: 'رد البوت', value: `${messagePing}ms`, inline: true },
        { name: 'Discord API', value: `${apiPing}ms`, inline: true }
      )
      .setTimestamp();

    await msg.edit({ content: '', embeds: [pingEmbed] });
  },
};
