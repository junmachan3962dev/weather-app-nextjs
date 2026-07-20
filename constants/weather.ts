//天気アイコンのインポート
import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";
//天気の型の定義（sunny, cloud...etc）
import { WeatherType } from "@/types/weather-type";

/**
 * 各コンポーネントの天気の状態に対応する天気アイコンを返す関数
 */

//天気アイコンの対応表（マッピング）
export const WEATHER_ICONS: Record<WeatherType, React.ElementType> = {
  sunny: Sun,
  rainy: CloudRain,
  cloudy: Cloud,
  snowy: Snowflake,
};

//現在の天気に対するアイコンの変換関数
export const getWeatherIcon = (type: string) => {
  const Icon = WEATHER_ICONS[type  as keyof typeof WEATHER_ICONS] || Sun;
  return Icon;
};