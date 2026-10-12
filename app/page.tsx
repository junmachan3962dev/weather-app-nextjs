import { HeaderBarComponent } from "@/component/HeaderBar";
import { CurrentWeatherComponent } from "@/component/CurrentWeather";
import { HourlyWeatherComponent } from "@/component/HourlyWeather";
import { DailyWeatherComponent } from "@/component/DailyWeather";
/* import { mockWeatherData } from "@/data/Weather"; */
// #1. mockWeatherDataの代わりに、API司令塔をインポート
import {getWeatherByCity} from "@/lib/openWeather";
import { convertOpenWeatherToAppData} from "@/utils/weather-map";

// #2. サーバーコンポーネントとして async を付与
export default async function WeatherPage() {
  // #3. 司令塔を使って、指定した都市（例: "Kitakami"）のデータを取得
  const {weatherData} = await getWeatherByCity("nagoya")
  // #4. 取得した生データを、翻訳関数（マッパー）に渡してモックと同じ形に変換する
  const mappedData = convertOpenWeatherToAppData(weatherData);

  return (
    <main className="w-full max-w-md p-4 mx-auto min-h-screen space-y-4">
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