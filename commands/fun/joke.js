import { EmbedBuilder } from 'discord.js';
import config from '../../config.json' assert { type: 'json' };

const jokes = [
  { question: 'ما الفرق بين الملح والسكر؟', answer: 'الملح يملح والسكر يسكر! 😂' },
  { question: 'لماذا الطماطم حمراء؟', answer: 'لأن الموز أصفر! 🍌' },
  { question: 'ما اسم البرتقالة الحزينة؟', answer: 'الحزينة! 😢' },
  { question: 'كم عدد الشنطات التي تحتاجها الشنطة؟', answer: 'شنطة واحدة فقط لأنها بالفعل شنطة! 👜' },
  { question: 'ما الذي يجعل البطريق سعيداً؟', answer: 'الأسماك! 🐟' },
];

export default {
  name: 'joke',
  description: 'نكتة عشوائية',
  async execute(message, args, client) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const jokeEmbed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('😂 نكتة عشوائية')
      .addFields(
        { name: '❓ السؤال', value: randomJoke.question },
        { name: '✅ الإجابة', value: randomJoke.answer }
      )
      .setTimestamp();

    await message.reply({ embeds: [jokeEmbed] });
  },
};
