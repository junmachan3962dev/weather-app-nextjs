import type { HourlyWeather } from "@/types/Weather";
import { WEATHER_ICON_MAP } from "@/utils/weather-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HourlyWeatherProps {
  hourlyData: HourlyWeather[];
}
export function HourlyWeather({ hourlyData }: HourlyWeatherProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>３時間ごとの天気</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {hourlyData.map((item) => {
            //アイコン名に対応するコンポーネントを取得する
            //万が一iconが不正な値でもアプリが壊れないようにデフォルト値を設定する
            const Icon = WEATHER_ICON_MAP[item.icon] ?? WEATHER_ICON_MAP["Default"];
            return (
            <li key={item.time}>
              <p>{item.time}</p>
              <Icon />
              <p>{item.precipitation}</p>
              <p>{item.temp}</p>
            </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
