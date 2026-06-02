import { EmbedBuilder } from 'discord.js';
import { getUserData } from '../../utils/database.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'rank',
  description: 'عرض رتبة المستخدم',
  async execute(message, args, client) {
    const user = message.mentions.users.first() || message.author;
    const userData = getUserData(user.id, message.guild.id);

    const xpToNextLevel = 200 - (userData.xp % 200);

    const rankEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle(`⭐ رتبة ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '📊 المستوى', value: `${userData.level}`, inline: true },
        { name: '✨ الخبرة', value: `${userData.xp} XP`, inline: true },
        { name: '🎯 الخبرة المتبقية', value: `${xpToNextLevel} XP`, inline: true },
        { name: '⚠️ التحذيرات', value: `${userData.warns || 0}`, inline: true }
      )
      .setTimestamp();

    await message.reply({ embeds: [rankEmbed] });
  },
};
