import { EmbedBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'coinflip',
  description: 'رمي العملة',
  async execute(message, args, client) {
    const result = Math.random() < 0.5 ? 'أوجه 🪙' : 'نعوش 🪙';

    const coinEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('🪙 رمي العملة')
      .setDescription(`النتيجة: **${result}**`)
      .setTimestamp();

    await message.reply({ embeds: [coinEmbed] });
  },
};
