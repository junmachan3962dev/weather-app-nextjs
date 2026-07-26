import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

import {WeatherType} from "@/types/weather-type";

// --- ユーティリティ関数 ---

//現在の天気に応じて、アイコンの色をを切り替える関数（辞書）
export function getIconClass(type: WeatherType): string {
  switch (type) {
    case "sunny":
      return "text-yellow-500";
    case "rainy":
      return "text-blue-600";
    case "cloudy":
      return "text-gray-500";
    case "snowy":
      return "text-sky-300";
    default: //その他の処理
      return "text-gray-900";
  }
}


//天気の状態に対応するアイコンを切り替える関数
export function getIconComponent(type: WeatherType) {
  switch (type) {
    case "sunny":
      return Sun;
    case "rainy":
      return CloudRain;
    case "cloudy":
      return Cloud;
    case "snowy":
      return Snowflake;
    default:
      return Sun;
  }
}

//天気の種類に応じて、背景のグラデーションクラスを切り替える関数
export function getBgClass(type: WeatherType) {
  switch (type) {
    case "sunny":
      return "bg-gradient-to-b from-orange-100 to-orange-400";
    case "rainy":
      return "bg-gradient-to-b from-blue-100 to-blue-400";
    case "cloudy":
      return "bg-gradient-to-b from-gray-100 to-gray-400";
    default:
      return "bg-gradient-to-b from-slate-100 to-slate-400";
  }
}