import type { DailyWeather } from "@/types/Weather";
import { WEATHER_ICON_MAP } from "@/utils/weather-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DailyWeatherProps {
  dailyData: DailyWeather[];
}

export function DailyWeatherComponent({ dailyData }: DailyWeatherProps) {
  //1.全体の制定・最高気温を計算
  const allMin = Math.min(...dailyData.map((d) => d.tempMin));
  const allMax = Math.max(...dailyData.map((d) => d.tempMax));
  const tempRange = allMax - allMin || 1; //0徐算防止
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">週間予報</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="p-2">
          {dailyData.map((item) => {
            //2. 各日のバーの位置と幅を計算
            const leftPercent = ((item.tempMin - allMin) / tempRange) * 100;
            const widthPercent = Math.max(
              ((item.tempMax - item.tempMin) / tempRange) * 100,
              6,
            );
            //アイコン名に対応するコンポーネントを取得する
            //万が一iconが不正な値でもアプリが壊れないようにデフォルト値を設定する
            const Icon =
              WEATHER_ICON_MAP[item.icon] ?? WEATHER_ICON_MAP["Default"];
            return (
              <li key={item.day} className="flex items-center justify-between pt-2 pb-2 border-t border-gray-400">
                <div className="flex items-center justify-between w-[120px]">
                  <p className="text-base font-semibold">{item.day}</p>
                  <div className="flex flex-col items-center text-center">
                    <Icon className="w-7 h-7 text-3xl" />
                    <p className="text-sm text-gray-400">{item.precipitation}%</p>
                  </div>
                </div>
                {/* 最低最高気温、プログレスバー */}
                <div className="flex items-center justify-between w-[180px] space-x-2">
                  <span className="w-9 text-base font-semibold text-right">{item.tempMin}°</span>
                  <div className="flex-1 h-2 bg-gray-200/60 rounded-full relative overflow-hidden">
                    <div
                      className="absolute h-full bg-blue-400 rounded-full"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>
                  <span className="w-9 text-base font-semibold text-right">{item.tempMax}°</span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
