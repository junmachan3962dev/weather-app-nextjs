import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";
import { WeatherType } from "@/types/weather-type";

//アイコンのマッピング
const ICON_MAP: Record<WeatherType, React.ElementType> = {
  sunny: Sun,
  rainy: CloudRain,
  cloudy: Cloud,
  snowy: Snowflake,
};

//アイコンの色のマッピング
const ICON_CLASS_MAP: Record<WeatherType, string> = {
  sunny: "text-yellow-500",
  rainy: "text-blue-600",
  cloudy: "text-gray-500",
  snowy: "text-sky-300",
};

//背景の色のマッピング
const BG_CLASS_MAP: Record<WeatherType, string> = {
  sunny: "bg-gradient-to-b from-orange-100 to-orange-400",
  rainy: "bg-gradient-to-b from-blue-100 to-blue-400",
  cloudy: "bg-gradient-to-b from-gray-100 to-gray-400",
  snowy: "bg-gradient-to-b from-sky-100 to-sky-400",
};

// --- ユーティリティ関数（ヘルパー関数） ---

//アイコンの種類
export function getIconComponent(type: WeatherType) {
  return ICON_MAP[type] ?? Sun;
}

//アイコンの色
export function getIconClass(type: WeatherType): string {
  return ICON_CLASS_MAP[type] ?? "text-gray-900";
}

//背景の色
export function getBgClass(type: WeatherType): string {
  return BG_CLASS_MAP[type] ?? "bg-gradient-to-b from-slate-100 to-slate-400";
}
