import config from '../config.json' assert { type: 'json' };
import { checkSpam, containsSuspiciousLinks, containsMassTagging } from '../utils/antiSpam.js';
import { addXP, getUserData } from '../utils/database.js';
import { EmbedBuilder } from 'discord.js';

export default {
  async execute(message, client) {
    // تجاهل رسائل البوتات
    if (message.author.bot) return;

    // فحص السبام
    if (checkSpam(message.author.id)) {
      await message.reply('⚠️ توقف عن السبام!').catch(() => {});
      return;
    }

    // فحص الروابط المشبوهة
    if (containsSuspiciousLinks(message.content)) {
      await message.delete().catch(() => {});
      await message.author.send('تم حذف رسالتك لأنها تحتوي على روابط مشبوهة').catch(() => {});
      return;
    }

    // فحص الإشارات الجماعية
    if (containsMassTagging(message)) {
      await message.delete().catch(() => {});
      return;
    }

    // إضافة XP
    if (message.guild && !message.author.bot) {
      const randomXp = Math.floor(Math.random() * 11) + 10; // 10-20 XP
      const { userData, leveledUp, newLevel } = addXP(message.author.id, message.guild.id, randomXp);

      if (leveledUp) {
        const levelUpEmbed = new EmbedBuilder()
          .setColor(config.successColor)
          .setTitle('🎉 تم رفع المستوى!')
          .setDescription(`مبروك ${message.author}! لقد وصلت للمستوى **${newLevel}**`)
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp();

        await message.reply({ embeds: [levelUpEmbed] }).catch(() => {});
      }
    }

    // فحص البادئة
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // استخراج الأمر والمعاملات
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // البحث عن الأمر
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      // تنفيذ الأمر
      await command.execute(message, args, client);
      client.stats.commandsExecuted++;
    } catch (error) {
      console.error('❌ خطأ في تنفيذ الأمر:', error);
      await message.reply('❌ حدث خطأ أثناء تنفيذ الأمر').catch(() => {});
    }
  },
};
