import { EmbedBuilder } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

export default {
  async execute(member, client) {
    const guild = member.guild;
    const logChannel = guild.channels.cache.get(config.logChannelId);

    if (!logChannel) {
      console.log('⚠️ قناة السجلات غير موجودة');
      return;
    }

    // إنشاء embed المغادرة
    const leaveEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('👋 عضو تركت السيرفر')
      .setDescription(`${member.user.username} غادر السيرفر`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '👤 الاسم', value: member.user.tag, inline: true },
        { name: '🆔 المعرف', value: member.id, inline: true },
        { name: '👥 عدد الأعضاء الآن', value: `${guild.memberCount}`, inline: true }
      )
      .setTimestamp();

    // إرسال السجل
    await logChannel.send({ embeds: [leaveEmbed] }).catch(error => {
      console.error('❌ خطأ في إرسال سجل المغادرة:', error);
    });
  },
};
