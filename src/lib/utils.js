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
