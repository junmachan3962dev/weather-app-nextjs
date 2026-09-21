import type { CurrentWeather, HourlyWeather, DailyWeather } from "@/types/Weather";
import { CurrentWeather as CurrentWeatherComponent } from "@/component/CurrentWeather";
import { HourlyWeather as HourlyWeatherComponent } from "@/component/HourlyWeather";
import { DailyWeather as DailyWeatherComponent } from "@/component/DailyWeather";

export default function TestPage() {
  const currentMockData: CurrentWeather = {
    time: "14:00",
    city: "盛岡市",
    condition: "Cloud",
    icon: "CloudSnow",
    temp: -10,
    tempMax: 25,
    tempMin: 18,
    precipitation: 30,
  };

  const hourlyMockData: HourlyWeather[] = [
    {
      time: "15:00",
      condition: "Sun",
      icon: "Sun",
      temp: 24,
      tempMax: 25,
      tempMin: 16,
      precipitation: 10,
    },
    {
      time: "18:00",
      condition: "Cloud",
      icon: "Cloud",
      temp: 20,
      tempMax: 22,
      tempMin: 16,
      precipitation: 30,
    },
    {
      time: "21:00",
      condition: "CloudRain",
      icon: "CloudRain",
      temp: 18,
      tempMax: 19,
      tempMin: 15,
      precipitation: 60,
    },
    {
      time: "23:00",
      condition: "CloudRain",
      icon: "CloudRain",
      temp: 18,
      tempMax: 19,
      tempMin: 15,
      precipitation: 60,
    },
    {
      time: "23:00",
      condition: "CloudRain",
      icon: "CloudRain",
      temp: 18,
      tempMax: 19,
      tempMin: 15,
      precipitation: 60,
    },
    {
      time: "23:00",
      condition: "CloudRain",
      icon: "CloudRain",
      temp: 18,
      tempMax: 19,
      tempMin: 15,
      precipitation: 60,
    },
  ];

  const dailyMockData: DailyWeather[] = [
    {
      day: "今日",
      condition: "Sun",
      icon: "Sun",
      tempMax:20,
      tempMin: 16,
      precipitation: 10,
    },
    {
      day: "日曜",
      condition: "CloudRain",
      icon: "CloudRain",
      tempMax: 20,
      tempMin: 12,
      precipitation: 80,
    },
    {
      day: "月曜",
      condition: "Cloud",
      icon: "Cloud",
      tempMax: 22,
      tempMin: 15,
      precipitation: 30,
    },
    {
      day: "火曜",
      condition: "Cloud",
      icon: "Cloud",
      tempMax: 22,
      tempMin: 15,
      precipitation: 30,
    },
    {
      day: "水曜",
      condition: "Cloud",
      icon: "Cloud",
      tempMax: 22,
      tempMin: 15,
      precipitation: 30,
    },
    {
      day: "水曜",
      condition: "Cloud",
      icon: "Cloud",
      tempMax: 22,
      tempMin: 15,
      precipitation: 30,
    },
  ];

  return (
    <main className="w-full max-w-md p-4 mx-auto min-h-screen space-y-4">
      {/* CurrentWeather.tsx確認用 */}
      <section className="w-full">
        <CurrentWeatherComponent currentData={currentMockData} />
      </section>

      {/* HourlyWeather.tsx確認用 */}
      <section className="w-full">
        <HourlyWeatherComponent hourlyData={hourlyMockData} />
      </section>

      {/* DailyWeather.tsx確認用 */}
      <section className="w-full">
        <DailyWeatherComponent dailyData={dailyMockData} />
      </section>
    </main>
  );
}