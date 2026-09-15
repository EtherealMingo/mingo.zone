import {
  BracesIcon,
  Code2Icon,
  PaletteIcon,
  SmartphoneIcon,
  VideoIcon,
  WrenchIcon,
} from "lucide-react";

export const SKILL_ICON_MAP = {
  code2: Code2Icon,
  braces: BracesIcon,
  video: VideoIcon,
  smartphone: SmartphoneIcon,
  wrench: WrenchIcon,
  palette: PaletteIcon,
};

export const SKILL_ACCENT_CLASS = {
  brand: "text-brand",
  yellow: "text-yellow-500 dark:text-yellow-300",
  pink: "text-pink-500 dark:text-pink-400",
  green: "text-green-600 dark:text-green-400",
  gray: "text-gray-500 dark:text-gray-300",
  purple: "text-purple-600 dark:text-purple-400",
};

export function getSkillIcon(name) {
  return SKILL_ICON_MAP[name] || Code2Icon;
}

export function getSkillAccentClass(accent) {
  return SKILL_ACCENT_CLASS[accent] || SKILL_ACCENT_CLASS.brand;
}
