import { HeaderBarComponent } from "@/component/HeaderBar";
import { CurrentWeatherComponent } from "@/component/CurrentWeather";
import { HourlyWeatherComponent } from "@/component/HourlyWeather";
import { DailyWeatherComponent } from "@/component/DailyWeather";
import { getWeatherByCity } from "@/lib/openWeather";
import { convertOpenWeatherToAppData} from "@/utils/weather-map";
import WeatherSearch from "@/component/weatherSearch";

// サーバーコンポーネントとして async を付与
export default async function WeatherPage() { 
  // APIロジックへ都市名をパラメーターとして送り天気情報を取得する
  const { weatherData } = await getWeatherByCity("那覇")
  // 取得した天気情報を、翻訳関数に渡しUIに使用できる形に整形する
  const mappedData = convertOpenWeatherToAppData(weatherData);

  return (
    <main className="w-full max-w-md p-4 mx-auto min-h-screen space-y-4">
      <WeatherSearch />
      
      {/* HeaderBar */}
      <section className="w-full">
        <HeaderBarComponent />
      </section>
      
      {/* CurrentWeatherComponent */}
      <section className="w-full">
        <CurrentWeatherComponent currentData={mappedData.current} />
      </section>

      {/* HourlyWeatherComponent */}
      <section className="w-full">
        <HourlyWeatherComponent hourlyData={mappedData.hourly} />
      </section>

      {/* DailyWeatherComponent */}
      <section className="w-full">
        <DailyWeatherComponent dailyData={mappedData.daily} />
      </section>
    </main>
  );
}

/* 
モックデータから本物データ(openWeatherからのデータ)に切り替えるためのステップ
#1. #2. #3. #4. の順番で
#4. 本物の weatherData を渡す
*/