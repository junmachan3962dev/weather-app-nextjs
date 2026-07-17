'use client';
//ReactのuseState フックを読み込む（コンポーネント内で状態を管理する）
import {useState} from "react";

//lucide-reactから天気アイコンをインポート
import {Sun, Cloud, CloudRain} from "lucide-react";

//各コンポーネントをインポートする
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { DailyWeatherCard } from "@/components/weather/daily-weather-card";
import { HourlyWeatherCard } from "@/components/weather/hourly-weather-card";

//現在の天気予想の型定義をインポート
import {CurrentWeatherType} from "@/types/current-weather";
//週間天気用の型定義をインポート
import { WeatherType, WeatherItem } from "@/types/daily-weather";
//時間ごとの天気用の型定義をインポート
import {HourlyWeatherType} from "@/types/hourly-wether";


//天気の種類に応じて、背景のグラデーションクラスを切り替える関数
function getBgClass(type: WeatherType) {
  switch (type) {
    case "sunny":
      return "bg-gradient-to-b from-orange-100 to-orange-400";
    case "rainy":
      return "bg-gradient-to-b from-blue-100 to-blue-400";
    case "cloudy":
      return "bg-gradient-to-b from-gray-100 to-gray-400";
    default:
      return "bg-gradient-to-b from-slate-100 to-slate-400";
  }
}

export default function Home() {
const [isOpen, setIsOpen] = useState(false);

const openSearchModal = () => {
  setIsOpen(true);
};

  //現在の天気予想のモックデータ
  const currentWeatherData : CurrentWeatherType = {
    city: "Chicago, Illinois",
    temp: 27,
    weather: "sunny",
    high: 27,
    low: 15,
    icon: <Sun size={80} />
  };

  //時間ごとの天気予想のモックデータ(hourlyWeahterData)
  const hourlyWeatherData: HourlyWeatherType[]  = [
    {time: "Now", icon: <Sun size={35} />, temp: 27},
    {time: "12:00", icon: <Sun size={30} />, temp: 27},  
    {time: "15:00", icon: <Sun size={30} />, temp: 28},  
    {time: "18:00", icon: <Sun size={30} />, temp: 26},  
    {time: "21:00", icon: <Sun size={30} />, temp: 22},  
    {time: "0:00", icon: <Sun size={30} />, temp: 19},  
    {time: "3:00", icon: <Sun size={30} />, temp: 17},  
  ]

  //１週間の天気予想のモックデータ
  const dailyWeatherData: WeatherItem[] = [
    //iconは一時的に表示ように設定したので外部データを取得した時に消去すること
    { day: "Today", type: "sunny", min: 15, max: 27, percentage: 60, icon: <Sun />},
    { day: "Mon", type: "rainy", min: 16, max: 28, percentage: 60, icon: <CloudRain />},
    { day: "Tue", type: "cloudy", min: 14, max: 26, percentage: 50, icon: <Cloud />},
    { day: "Wed", type: "sunny", min: 17, max: 29, percentage: 80, icon: <Sun /> },
    { day: "Thu", type: "sunny", min: 15, max: 25, percentage: 40, icon: <Sun /> },
    { day: "Fri", type: "sunny", min: 18, max: 30, percentage: 90, icon: <Sun />  },
  ];

  //今日の天気データ(WeatherDataの＊番目の要素)を取得する
  const todayWeather = dailyWeatherData[2];
  //今日の天気の種類に応じて背景クラスを決定する
  const bgClass = getBgClass(todayWeather.type);

  return (
    <main className={`min-h-screen max-w-md w-full mx-auto p-4 space-y-4 ${bgClass}`}>
      <h1 className="text-center font-semibold">Weather Forecast</h1>

      <div>
        <CurrentWeatherCard 
        weather={currentWeatherData}
        openSearchModal={openSearchModal}
        />
      </div>

      <div>
        <HourlyWeatherCard weather={hourlyWeatherData}/>
      </div>

      <div>
        {/* weatherをdailyWeatherCardにpropsとして渡す */}
        <DailyWeatherCard weather={dailyWeatherData} />
      </div>
    </main>
  );
}
