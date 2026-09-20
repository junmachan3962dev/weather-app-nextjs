import type { CurrentWeather, HourlyWeather, DailyWeather } from "@/types/Weather";
import { CurrentWeather as CurrentWeatherComponent } from "@/component/CurrentWeather";
import { HourlyWeather as HourlyWeatherComponent } from "@/component/HourlyWeather"; // パスと名前を修正
import { DailyWeather as DailyWeatherComponent } from "@/component/DailyWeather";     // パスを修正

export default function TestPage() {
  const currentMockData: CurrentWeather = {
    time: "14:00",
    city: "盛岡市",
    condition: "Cloud",
    icon: "Sun",
    temp: -22,
    tempMax: 25,
    tempMin: 18,
    precipitation: 100,
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
  ];

  const dailyMockData: DailyWeather[] = [ // 必要に応じて型を指定
    {
      day: "今日",
      condition: "Sun",
      icon: "Sun",
      tempMax: 25,
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
  ];

  return (
    <main className="mx-auto max-w-md p-4 space-y-4 min-h-screen">
      {/* CurrentWeather.tsx確認用 */}
      <section className="w-full">
        <CurrentWeatherComponent currentData={currentMockData} />
      </section>

      {/* HourlyWeather.tsx確認用 */}
      <section className="w-full">
        <HourlyWeatherComponent hourlyData={hourlyMockData} /> {/* スペルミス修正 */}
      </section>

      {/* DailyWeather.tsx確認用 */}
      <section className="w-full">
        <DailyWeatherComponent dailyData={dailyMockData} />
      </section>
    </main>
  );
}