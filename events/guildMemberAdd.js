import { EmbedBuilder } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

export default {
  async execute(member, client) {
    const guild = member.guild;
    const welcomeChannel = guild.channels.cache.get(config.welcomeChannelId);

    if (!welcomeChannel) {
      console.log('⚠️ قناة الترحيب غير موجودة');
      return;
    }

    // إنشاء embed الترحيب
    const welcomeEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle(`🎉 أهلاً وسهلاً ${member.user.username}!`)
      .setDescription(`مرحباً في ${guild.name}\nنتمنى لك وقتاً ممتعاً معنا!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '👥 عدد أعضاء السيرفر', value: `${guild.memberCount}`, inline: true },
        { name: '📅 تاريخ الانضمام', value: `<t:${Math.floor(Date.now() / 1000)}:D>`, inline: true },
        { name: '🆔 معرفك', value: `${member.id}`, inline: false }
      )
      .setTimestamp()
      .setFooter({ text: 'نتمنى لك تجربة رائعة معنا' });

    // إرسال رسالة الترحيب
    await welcomeChannel.send({ embeds: [welcomeEmbed] }).catch(error => {
      console.error('❌ خطأ في إرسال رسالة الترحيب:', error);
    });

    // إعطاء رتبة تلقائية
    if (config.autoRoleId) {
      try {
        const autoRole = guild.roles.cache.get(config.autoRoleId);
        if (autoRole) {
          await member.roles.add(autoRole);
          console.log(`✅ تم إعطاء الرتبة ${autoRole.name} للعضو ${member.user.tag}`);
        }
      } catch (error) {
        console.error('❌ خطأ في إعطاء الرتبة التلقائية:', error);
      }
    }
  },
};
