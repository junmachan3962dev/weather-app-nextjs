import type { DailyWeather } from "@/types/Weather";
import { WEATHER_ICON_MAP } from "@/utils/weather-map";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DailyWeatherProps {
  dailyData: DailyWeather[];
}

export function DailyWeather({ dailyData }: DailyWeatherProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>週間予報</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {dailyData.map((item) => {
            //アイコン名に対応するコンポーネントを取得する
            //万が一iconが不正な値でもアプリが壊れないようにデフォルト値を設定する
            const Icon = WEATHER_ICON_MAP[item.icon] ?? WEATHER_ICON_MAP["Default"];
            return (
              <li key={item.day}>
                <p>{item.day}</p>
                <Icon />
                <p>{item.precipitation}</p>
                <p>{item.tempMin}</p>
                <p>{item.tempMax}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
