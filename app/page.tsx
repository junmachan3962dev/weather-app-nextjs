"use client";

import { useState } from "react";
import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";
import { WEATHER_ICONS } from "@/constants/weather";

//各コンポーネントをインポート
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { DailyWeatherCard } from "@/components/weather/daily-weather-card";
import { HourlyWeatherCard } from "@/components/weather/hourly-weather-card";

import {
  currentWeatherData,
  hourlyWeatherData,
  dailyWeatherData,
} from "@/data/weather-data";

//型定義
import { WeatherType } from "@/types/weather-type";

// --- ユーティリティ関数 ---



//現在の天気に応じて、アイコンの色をを切り替える関数（辞書）
function getIconClass(type: WeatherType): string {
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
function getIconComponent(type: WeatherType) {
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
function getBgClass(type: WeatherType) {
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


export default function Home() {
  //都市名入力のためのモーダルウインドー開閉用の関数
  const [isOpen, setIsOpen] = useState(false);
  const openSearchModal = () => setIsOpen(true);

  // --- 表示用ロジック(dailyWeatherDataからデータ取得) ---

  //dailyWeatherDataの ＊版目のデータを取得する（天気アイコンと背景切り替え関数共通）
  const todayWeather = dailyWeatherData[0];         
  
  //天気アイコン色変換用関数
  const iconClass = getIconClass(todayWeather.type);
  
  //現在の天気対応の背景切り替え関数
  const bgClass = getBgClass(todayWeather.type);

  //天気の種類に応じたアイコンを表示するための関数
  const IconComponent = getIconComponent(todayWeather.type);
  
  
  return (
    <main
      className={`min-h-screen max-w-md w-full mx-auto p-4 space-y-4 ${bgClass}`}
    >
      <h1 className="text-center font-semibold">Weather Forecast</h1>
      <div>
        <CurrentWeatherCard
          weather={currentWeatherData}
          openSearchModal={openSearchModal}
          IconComponent={IconComponent}
          iconClass={iconClass}
        />
      </div>

      <div>
        <HourlyWeatherCard 
          weather={hourlyWeatherData}
          IconComponent={IconComponent}
        />
      </div>

      <div>
        <DailyWeatherCard weather={dailyWeatherData} />
      </div>
    </main>
  );
}
