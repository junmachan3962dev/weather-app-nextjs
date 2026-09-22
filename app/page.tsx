import { HeaderBarComponent } from "@/component/HeaderBar";
import { CurrentWeatherComponent } from "@/component/CurrentWeather";
import { HourlyWeatherComponent } from "@/component/HourlyWeather";
import { DailyWeatherComponent } from "@/component/DailyWeather";
import { mockWeatherData } from "@/data/Weather";

export default function WeatherPage() {
  return (
    <main className="w-full max-w-md p-4 mx-auto min-h-screen space-y-4">
      {/* HeaderBar */}
      <section className="w-full">
        <HeaderBarComponent />
      </section>
      {/* CurrentWeatherComponent */}
      <section className="w-full">
        <CurrentWeatherComponent currentData={mockWeatherData.current} />
      </section>

      {/* HourlyWeatherComponent */}
      <section className="w-full">
        <HourlyWeatherComponent hourlyData={mockWeatherData.hourly} />
      </section>

      {/* DailyWeatherComponent */}
      <section className="w-full">
        <DailyWeatherComponent dailyData={mockWeatherData.daily} />
      </section>
    </main>
  );
}
