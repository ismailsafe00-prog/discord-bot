import { EmbedBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'roll',
  description: 'رمي النرد',
  async execute(message, args, client) {
    const number = Math.floor(Math.random() * 6) + 1;

    const rollEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('🎲 رمي النرد')
      .setDescription(`النتيجة: **${number}**`)
      .setTimestamp();

    await message.reply({ embeds: [rollEmbed] });
  },
};
