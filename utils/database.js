import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, '../data/xp.json');

/**
 * قراءة بيانات XP من الملف
 */
export function getXPData() {
  try {
    const data = readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('خطأ في قراءة ملف XP:', error);
    return {};
  }
}

/**
 * حفظ بيانات XP في الملف
 */
export function saveXPData(data) {
  try {
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('خطأ في حفظ بيانات XP:', error);
  }
}

/**
 * الحصول على بيانات المستخدم
 */
export function getUserData(userId, guildId) {
  const data = getXPData();
  const key = `${guildId}-${userId}`;
  
  if (!data[key]) {
    data[key] = {
      userId,
      guildId,
      xp: 0,
      level: 1,
      warns: 0,
      lastXpTime: Date.now(),
    };
    saveXPData(data);
  }
  
  return data[key];
}

/**
 * إضافة XP للمستخدم
 */
export function addXP(userId, guildId, xp) {
  const data = getXPData();
  const key = `${guildId}-${userId}`;
  const userData = getUserData(userId, guildId);
  
  userData.xp += xp;
  
  // حساب المستوى (كل 200 XP = مستوى جديد)
  const newLevel = Math.floor(userData.xp / 200) + 1;
  const leveledUp = newLevel > userData.level;
  
  userData.level = newLevel;
  userData.lastXpTime = Date.now();
  
  data[key] = userData;
  saveXPData(data);
  
  return { userData, leveledUp, newLevel };
}

/**
 * الحصول على Leaderboard
 */
export function getLeaderboard(guildId, limit = 10) {
  const data = getXPData();
  const guildData = Object.values(data)
    .filter(user => user.guildId === guildId)
    .sort((a, b) => b.xp - a.xp)
    .slice(0, limit);
  
  return guildData;
}

/**
 * إضافة تحذير للمستخدم
 */
export function addWarn(userId, guildId) {
  const data = getXPData();
  const userData = getUserData(userId, guildId);
  userData.warns = (userData.warns || 0) + 1;
  
  const key = `${guildId}-${userId}`;
  data[key] = userData;
  saveXPData(data);
  
  return userData.warns;
}

/**
 * الحصول على عدد التحذيرات
 */
export function getWarns(userId, guildId) {
  const userData = getUserData(userId, guildId);
  return userData.warns || 0;
}

export default {
  getXPData,
  saveXPData,
  getUserData,
  addXP,
  getLeaderboard,
  addWarn,
  getWarns,
};
