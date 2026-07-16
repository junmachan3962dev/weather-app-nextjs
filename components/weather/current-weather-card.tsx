'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun } from "lucide-react";
import {CurrentWeatherType} from "@/types/current-weather";

interface CurrentWeatherCardProps {
  weather: CurrentWeatherType;
  openSearchModal: () => void;
};


export function CurrentWeatherCard(
  {weather, openSearchModal}: CurrentWeatherCardProps) 
{
  return (
    <main>
      {/* 地域名と更新時刻のヘッダー部分 */}
      <div className="text-center group cursor-pointer" onClick={openSearchModal}>
        <h2 className="text-3xl font-extrabold">{weather.city}</h2>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
          <span>Change Location</span>
          <span className="text-xs">▼</span>
        </div>
      </div>
      {/* 現在の天気アイコン、気温、概要 */}
      <div className="flex flex-col items-center mt-2">
        {weather.icon}
        <p className="mt-2 text-3xl font-extrabold"></p>
        <p className="font-semibold">{weather.weather}</p>
        {/* 最高気温と最低気温の表示 */}
        <div className="flex justify-center mt-2 gap-2 font-semibold">
          <div>
            <span>{weather.high}</span>
          </div>
          <div>
            <span>{weather.low}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
