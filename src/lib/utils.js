import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 组合并优化 CSS 类名的工具函数
// 结合了 clsx 的条件类名处理和 tailwind-merge 的 Tailwind 类名优化
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * 提取所有图片的URL
 * @param {Array} photos - 包含摄影作品类别的数组
 * @returns {Array} 所有图片URL的数组
 */
export function extractAllImageUrls(photos) {
  return photos.flatMap(category => 
    category.images.map(image => image.url)
  );
}

/**
 * 脱敏处理手机号码
 * @param {string} phone - 原始手机号码
 * @returns {string} 脱敏后的手机号码，如138****5678
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  // 假设手机号码是11位，保留前3位和后4位，中间用****代替
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}
