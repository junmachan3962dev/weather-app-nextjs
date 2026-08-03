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

//モックデータをインポート
import {
  currentWeatherData,
  hourlyWeatherData,
  dailyWeatherData,
} from "@/data/weather-data";

export default function Home() {
  //都市名入力のためのモーダルウインドー開閉を管理
  const [isOpen, setIsOpen] = useState(false);
  const openSearchModal = () => setIsOpen(true);

  //本日の天気を基準に、背景やメインアイコンの見た目を決定
  const todayWeather = dailyWeatherData[0];
  const iconClass = getIconClass(todayWeather.type);
  const bgClass = getBgClass(todayWeather.type);
  const IconComponent = getIconComponent(todayWeather.type);

  return (
    <main
      className={`min-h-screen max-w-md w-full mx-auto p-4 space-y-4 ${bgClass}`}
    >
      <h1 className="text-center font-semibold">Weather Forecast</h1>
      <section>
        <CurrentWeatherCard
          weather={currentWeatherData}
          openSearchModal={openSearchModal}
          IconComponent={IconComponent}
          iconClass={iconClass}
        />
      </section>

      <section>
        <HourlyWeatherCard weather={hourlyWeatherData} />
      </section>

      <section>
        <DailyWeatherCard weather={dailyWeatherData} />
      </section>
    </main>
  );
}
