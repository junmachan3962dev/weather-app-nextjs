import {WeatherType} from '@/types/Weather';

import {
    Sun,
    CloudSun,
    Cloud,
    CloudRain,
    CloudSnow,
    HelpCircle
} from 'lucide-react';

//天気の種類に対応するアイコンに変換するためのマップ
export const WEATHER_ICON_MAP = {
    "Sun": Sun,
    "CloudSun": CloudSun,
    "Cloud": Cloud,
    "CloudRain": CloudRain,
    "CloudSnow": CloudSnow, 
    "Default": HelpCircle,
} as const;

//天気表記（condition)の英語表記を日本語表記に変換するためのマップ
export const WEATHER_LABEL_MAP = {
    Sun: "晴れ",
    CloudSun: "晴れ時々曇り",
    Cloud: "曇り",
    CloudRain: "雨",
    CloudSnow: "雪",
} as const;

//天気アイコンの天気の種類に対応したアイコンの色に変換するためのマップ
export const WEATHER_COLOR_MAP = {
    Sun: "text-yellow-400",
    CloudSun: "text-yellow-400",
    Cloud: "text-gray-400",
    CloudRain: "text-blue-400",
    CloudSnow: "text-blue-200",
    Default: "text-yellow-400",
} as const;

//APIから取得した天気の種類をアプリで使えるようにするためにweatherTypeに変換するためのマップ
const WEATHER_TYPE_MAP: Record<string, WeatherType> = {
    clear: "Sun",
    clouds: "CloudSun",
    cloud: "Cloud",
    rain: "CloudRain",
    snow: "CloudSnow",
};
//APIから受け取った天気の種類をマップで変換して対応するWeatherTypeに変換する関数
export function mapOpenWeatherToType(mainCondition: string) {
    const normalized = mainCondition.toLowerCase();
    return WEATHER_TYPE_MAP[normalized] ?? "CloudSun";
}