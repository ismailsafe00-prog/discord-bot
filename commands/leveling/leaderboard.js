import { EmbedBuilder } from 'discord.js';
import { getLeaderboard } from '../../utils/database.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'leaderboard',
  description: 'لوحة الترتيب',
  async execute(message, args, client) {
    const leaderboard = getLeaderboard(message.guild.id, 10);

    if (leaderboard.length === 0) {
      await message.reply('لا توجد بيانات حالياً!');
      return;
    }

    let leaderboardText = '';
    for (let i = 0; i < leaderboard.length; i++) {
      const user = await client.users.fetch(leaderboard[i].userId);
      leaderboardText += `${i + 1}. **${user.username}** - المستوى: ${leaderboard[i].level} (${leaderboard[i].xp} XP)\n`;
    }

    const leaderboardEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('🏆 لوحة الترتيب')
      .setDescription(leaderboardText)
      .setTimestamp();

    await message.reply({ embeds: [leaderboardEmbed] });
  },
};
