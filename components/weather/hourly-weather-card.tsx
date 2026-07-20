//chadcn/uiから部品をインポート
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HourlyWeatherType } from "@/types/hourly-wether";

import { WEATHER_ICONS } from "@/constants/weather";
import {ElementType} from "react";

//lucide-reactからアイコンをインポート
import {Clock} from 'lucide-react'

type hourlyWeatherCardProps = {
  weather: HourlyWeatherType[];
  IconComponent: ElementType;
  iconClass: string;
};

export function HourlyWeatherCard({weather, IconComponent, iconClass}: hourlyWeatherCardProps) {
  //初回の現在時刻の天気用
  const first = weather[0];
  //2件目以降の天気用
  const rest = weather.slice(1);
  
  return (
    //ガラスモーフィズム適用
    <Card className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4">
      {/* カードヘッダー */}
      <CardHeader className="flex justify-between mb-[-4]">
        <CardTitle className="flex items-center gap-1 font-semibold">
            <Clock size={16} />
            <span className="text-sm font-medium">HOURLY FORECAST</span>
        </CardTitle>
      </CardHeader>
      {/* 時間ごとの天気予報リスト */}
      <CardContent>
            {/* 横スクロール対応リスト：スクロールバー非表示 */}
            <ul className="flex overflow-x-auto pl-2 snap-proximity scroll-smooth  scrollbar-none">
                {/* 現在の時刻のアイテム：強調のための追加のグラスモーフィズム */}
                  <li key={first.time} className="hourly-item font-extrabold backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg">
                    <p>{first.time}</p>
                    <IconComponent className={iconClass} size={20} />
                    <p>{first.temp}</p>
                  </li>

                {rest.map((item) => (
                <li key={item.time} className="hourly-item">
                    <p>{item.time}</p>
                    <IconComponent className={iconClass} size={20} />
                    <p>{item.temp}</p>
                </li>
            ))}
            </ul>
      </CardContent>
    </Card>
  );
}
