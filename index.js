import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import config from './config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// إنشاء البوت مع الـ intents المطلوبة
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Collections للأوامر والأحداث
client.commands = new Collection();
client.events = new Collection();

// متغيرات إحصائية
client.stats = {
  commandsExecuted: 0,
  startTime: Date.now(),
  servers: 0,
  users: 0,
};

// تحميل الأوامر
const commandsPath = join(__dirname, 'commands');
const commandFolders = readdirSync(commandsPath);

for (const folder of commandFolders) {
  const commandFiles = readdirSync(join(commandsPath, folder)).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = join(commandsPath, folder, file);
    const command = await import(pathToFileURL(filePath).href);
    const commandName = file.replace('.js', '');
    client.commands.set(commandName, command.default);
    console.log(`✅ تم تحميل الأمر: ${commandName}`);
  }
}

// تحميل الأحداث
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = await import(pathToFileURL(filePath).href);
  const eventName = file.replace('.js', '');
  
  if (event.default.once) {
    client.once(eventName, (...args) => event.default.execute(...args, client));
  } else {
    client.on(eventName, (...args) => event.default.execute(...args, client));
  }
  console.log(`✅ تم تحميل الحدث: ${eventName}`);
}

// تسجيل البوت
client.login(config.token);

// معالجة الأخطاء غير المعالجة
process.on('unhandledRejection', error => {
  console.error('❌ خطأ غير معالج:', error);
});

process.on('uncaughtException', error => {
  console.error('❌ استثناء غير متوقع:', error);
});

export default client;
