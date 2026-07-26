"use client";

import { useState } from "react";
import {
  getIconClass,
  getBgClass,
  getIconComponent
} from "@/utils/weather-utils";

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

export default function Home() {
  //都市名入力のためのモーダルウインドー開閉用の関数
  const [isOpen, setIsOpen] = useState(false);
  const openSearchModal = () => setIsOpen(true);

  //表示用ロジック（現在の天気・背景用）
  const todayWeather = dailyWeatherData[0];

  const iconClass = getIconClass(todayWeather.type);
  const bgClass = getBgClass(todayWeather.type);
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
        <HourlyWeatherCard weather={hourlyWeatherData} />
      </div>

      <div>
        <DailyWeatherCard weather={dailyWeatherData} />
      </div>
    </main>
  );
}
