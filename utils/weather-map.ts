import {
    Sun,
    CloudSun,
    Cloud,
    CloudRain,
    CloudSnow,
    HelpCircle
} from 'lucide-react';

//天気の種類に対応するアイコンのマッピング関数
export const WEATHER_ICON_MAP = {
    "Sun": Sun,
    "CloudSun": CloudSun,
    "Cloud": Cloud,
    "CloudRain": CloudRain,
    "CloudSnow": CloudSnow, 
    "Default": HelpCircle,
} as const;

//天気表記（condition)を英語表記から日本語に変換する翻訳マッピング関数
export const WEATHER_LABEL_MAP = {
    Sun: "晴れ",
    CloudSun: "晴れ時々曇り",
    Cloud: "曇り",
    CloudRain: "雨",
    CloudSnow: "雪",
} as const;

//天気アイコンの天気の種類に対応する色に変換するマッピング関数
export const WEATHER_COLOR_MAP = {
    Sun: "text-yellow-400",
    CloudSun: "text-yellow-400",
    Cloud: "text-gray-400",
    CloudRain: "text-blue-400",
    CloudSnow: "text-blue-200",
    Default: "text-yellow-400",
} as const;