/**
 * نظام منع السبام
 */

const userCooldowns = new Map();
const COOLDOWN_TIME = 3000; // 3 ثواني
const MAX_MESSAGES = 5; // الحد الأقصى للرسائل
const SPAM_CHECK_TIME = 5000; // 5 ثواني

/**
 * فحص السبام
 */
export function checkSpam(userId) {
  if (!userCooldowns.has(userId)) {
    userCooldowns.set(userId, {
      count: 1,
      firstMessageTime: Date.now(),
    });
    return false;
  }

  const userData = userCooldowns.get(userId);
  const timePassed = Date.now() - userData.firstMessageTime;

  if (timePassed > SPAM_CHECK_TIME) {
    userCooldowns.set(userId, {
      count: 1,
      firstMessageTime: Date.now(),
    });
    return false;
  }

  userData.count++;

  if (userData.count > MAX_MESSAGES) {
    return true; // السبام
  }

  return false;
}

/**
 * فحص الروابط المشبوهة
 */
export function containsSuspiciousLinks(content) {
  const suspiciousPatterns = [
    /discord\.gg\/[a-zA-Z0-9-]+/gi, // روابط الدعوة
    /bit\.ly/gi,
    /tinyurl/gi,
    /shorturl/gi,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(content));
}

/**
 * فحص الإشارات الجماعية
 */
export function containsMassTagging(message) {
  const mentionCount = message.mentions.size;
  return mentionCount > 5; // أكثر من 5 إشارات
}

/**
 * إزالة المستخدم من قائمة السبام
 */
export function clearUserCooldown(userId) {
  userCooldowns.delete(userId);
}

export default {
  checkSpam,
  containsSuspiciousLinks,
  containsMassTagging,
  clearUserCooldown,
};
