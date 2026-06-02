export default {
  once: true,
  async execute(client) {
    console.log(`\n✅ تم تسجيل البوت بنجاح: ${client.user.tag}`);
    console.log(`🎮 عدد السيرفرات: ${client.guilds.cache.size}`);
    console.log(`👥 عدد المستخدمين: ${client.users.cache.size}\n`);

    // تعيين حالة البوت
    client.user.setActivity('!help', { type: 'LISTENING' });
    client.user.setStatus('online');

    console.log('🤖 البوت جاهز للعمل!');
  },
};
