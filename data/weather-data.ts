//lucide-reactから天気アイコンをインポート
import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";//

//型定義
import { CurrentWeatherType } from "@/types/current-weather";//
import { WeatherItem } from "@/types/daily-weather";//
import { HourlyWeatherType } from "@/types/hourly-wether";//

// --- モックデータ ---

//現在の天気予想のモックデータ
export const currentWeatherData: CurrentWeatherType = {
  city: "Chicago, Illinois",
  temp: 27,
  weather: "sunny",           //天気の種類の表示用("sunny","rainy"など)
  high: 27,
  low: 15,
  type: "sunny",              //天気アイコンの表示用
};

//時間ごとの天気予想のモックデータ
export const hourlyWeatherData: HourlyWeatherType[] = [
  { time: "Now", icon: "sunny", temp: "27°" },
  { time: "12:00", icon: "sunny", temp: "27°" },
  { time: "15:00", icon: "sunny", temp: "28°" },
  { time: "18:00", icon: "sunny", temp: "26°" },
  { time: "21:00", icon: "sunny", temp: "22°" },
  { time: "0:00", icon: "sunny", temp: "19°" },
  { time: "3:00", icon: "sunny", temp: "17°" },
];

//１週間の天気予想のモックデータ
export const dailyWeatherData: WeatherItem[] = [
  //iconは一時的に表示ように設定したので外部データを取得した時に消去すること
  {
    day: "Today",
    type: "sunny",
    min: 15,
    max: 27,
    percentage: 60,
    icon: "sunny",
  },
  {
    day: "Mon",
    type: "rainy",
    min: 16,
    max: 28,
    percentage: 60,
    icon: "sunny",
  },
  {
    day: "Tue",
    type: "cloudy",
    min: 14,
    max: 26,
    percentage: 50,
    icon: "sunny",
  },
  {
    day: "Wed",
    type: "sunny",
    min: 17,
    max: 29,
    percentage: 80,
    icon: "sunny",
  },
  {
    day: "Thu",
    type: "sunny",
    min: 15,
    max: 25,
    percentage: 40,
    icon: "sunny",
  },
  {
    day: "Fri",
    type: "sunny",
    min: 18,
    max: 30,
    percentage: 90,
    icon: "sunny",
  },
];