import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 组合并优化 CSS 类名的工具函数
// 结合了 clsx 的条件类名处理和 tailwind-merge 的 Tailwind 类名优化
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
