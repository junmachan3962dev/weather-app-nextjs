import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

import { HourlyWeatherType } from "@/types/hourly-wether";
import { getIconComponent, getIconClass } from "@/utils/weather-utils";

type hourlyWeatherCardProps = {
  weather: HourlyWeatherType[];
};

export function HourlyWeatherCard({ weather }: hourlyWeatherCardProps) {
  //初回の現在時刻の天気用
  const first = weather[0];
  getIconClass;
  //2件目以降の天気用
  const rest = weather.slice(1);

  //最初の1件（現在時刻の天気）だけデザインが異なるため個別に処理
  const FirstIcon = getIconComponent(first.icon);
  const firstIconClass = getIconClass(first.icon);

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
          <li
            key={first.time}
            className="hourly-item font-extrabold backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg"
          >
            <p>{first.time}</p>
            <FirstIcon className={firstIconClass} size={30} />
            <p>{first.temp}</p>
          </li>

          {/* 2件目以降は同じデザインで繰り返し表示 */}
          {rest.map((item) => {
            //天気タイプごとにアイコンと色を変換
            const Icon = getIconComponent(item.icon);
            const iconClass = getIconClass(item.icon);

            return (
              <li key={item.time} className="hourly-item">
                <p>{item.time}</p>
                <Icon className={iconClass} size={30} />
                <p>{item.temp}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
