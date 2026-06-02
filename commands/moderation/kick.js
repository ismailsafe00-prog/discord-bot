import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

export default {
  name: 'kick',
  description: 'طرد عضو',
  async execute(message, args, client) {
    // فحص الصلاحيات
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      await message.reply('❌ ليس لديك صلاحية لطرد الأعضاء!');
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      await message.reply('❌ يرجى تحديد عضو!');
      return;
    }

    const reason = args.slice(1).join(' ') || 'بدون سبب';
    const member = await message.guild.members.fetch(user.id);

    try {
      await member.kick(reason);

      const kickEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🚫 تم طرد عضو')
        .addFields(
          { name: '👤 المستخدم', value: user.tag, inline: true },
          { name: '👮 تم الطرد من قبل', value: message.author.tag, inline: true },
          { name: '📝 السبب', value: reason }
        )
        .setTimestamp();

      await message.reply({ embeds: [kickEmbed] });

      // إرسال رسالة للـ log channel
      const logChannel = message.guild.channels.cache.get(config.logChannelId);
      if (logChannel) {
        await logChannel.send({ embeds: [kickEmbed] });
      }
    } catch (error) {
      console.error(error);
      await message.reply('❌ حدث خطأ أثناء طرد العضو');
    }
  },
};
