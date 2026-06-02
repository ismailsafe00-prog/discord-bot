import { EmbedBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

const responses = [
  'نعم، بالتأكيد! ✅',
  'لا، أبداً! ❌',
  'قد يكون! 🤔',
  'أعتقد أنك تعرف الإجابة بالفعل!',
  'سؤال غير واضح، اسأل مجدداً!',
  'الآن ليس الوقت المناسب!',
  'من المحتمل جداً! 😊',
  'سألتني في اللحظة الخاطئة!',
  'قدري أن أقول لا! 😢',
  'بالتأكيد! 🌟',
];

export default {
  name: '8ball',
  description: '8 كرات سحرية',
  async execute(message, args, client) {
    if (args.length === 0) {
      await message.reply('❌ يرجى أن تسأل سؤالاً!');
      return;
    }

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const ballEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('🎱 الكرة الثامنة')
      .addFields(
        { name: '❓ سؤالك', value: args.join(' ') },
        { name: '🎱 الإجابة', value: randomResponse }
      )
      .setTimestamp();

    await message.reply({ embeds: [ballEmbed] });
  },
};
