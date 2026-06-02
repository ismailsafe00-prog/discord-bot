/**
 * نظام تسجيل الأخطاء والأحداث
 */

export function logError(error, context = '') {
  console.error(`❌ خطأ ${context}:`, error);
}

export function logSuccess(message) {
  console.log(`✅ ${message}`);
}

export function logWarning(message) {
  console.warn(`⚠️ تحذير: ${message}`);
}

export function logInfo(message) {
  console.log(`ℹ️ ${message}`);
}

/**
 * إرسال log إلى قناة Discord
 */
export async function sendLogToChannel(channel, embed) {
  try {
    if (!channel) return;
    await channel.send({ embeds: [embed] });
  } catch (error) {
    logError(error, 'في إرسال log إلى القناة');
  }
}

export default {
  logError,
  logSuccess,
  logWarning,
  logInfo,
  sendLogToChannel,
};
