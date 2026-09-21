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
        <CardTitle className="font-bold text-base">３時間ごとの天気</CardTitle>
      </CardHeader>
    
      <CardContent>
        <ul className="flex items-center overflow-x-auto scrollbar-none scroll-smooth snap-x snap-proximity p-1 gap-3">
          {hourlyData.map((item) => {
            const Icon =
              WEATHER_ICON_MAP[item.icon] ?? WEATHER_ICON_MAP["Default"];
            return (
              <li
                key={item.time}
                className="snap-center shrink-0 space-y-2 p-4 rounded-2xl border border-white/20 bg-white/40 backdrop-blur-md  shadow-sm text-center font-semibold"
              >
                <p>{item.time}</p>
                <div>
                  <Icon className="mx-auto w-8 h-8" />
                  <p className="text-sm text-gray-400">{item.precipitation}%</p>
                </div>
                <p>{item.temp}°</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}