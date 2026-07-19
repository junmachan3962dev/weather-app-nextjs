"use client";
//ReactのuseState フックを読み込む（コンポーネント内で状態を管理する）
import { useState } from "react";

//lucide-reactから天気アイコンをインポート
import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

//各コンポーネントをインポートする
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { DailyWeatherCard } from "@/components/weather/daily-weather-card";
import { HourlyWeatherCard } from "@/components/weather/hourly-weather-card";

//現在の天気予想の型定義をインポート
import { CurrentWeatherType } from "@/types/current-weather";
//週間天気用の型定義をインポート
import { WeatherItem } from "@/types/daily-weather";
//時間ごとの天気用の型定義をインポート
import { HourlyWeatherType } from "@/types/hourly-wether";
//天気の種類を定義した天気の型をインポート
import { WeatherType } from "@/types/weather-type";

/**
 * current-weather-cardコンポーネント用の関数データ
 */
//天気に対応するアイコンを設定（マッピング定義）現在の天気と
const WEATHER_ICONS: Record<WeatherType, React.ElementType> = {
  sunny: Sun,
  rainy: CloudRain,
  cloudy: Cloud,
  snowy: Snowflake,
};

//現在の天気に応じて、アイコンの色をを切り替える関数（辞書）
function getIconClass(type: WeatherType): string {
  switch (type) {
    case "sunny":
      return "text-yellow-500";
    case "rainy":
      return "text-blue-600";
    case "cloudy":
      return "text-gray-500";
    case "snowy":
      return "text-sky-300";
    default: //その他の処理
      return  "text-gray-900"
  }
}

//現在の天気予想のモックデータ
  const currentWeatherData: CurrentWeatherType = {
    city: "Chicago, Illinois",
    temp: 27,
    weather: "sunny",
    high: 27,
    low: 15,
    type: "rainy",
  };

/**
 * 
 */
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
  
  //
  const openSearchModal = () => {
    setIsOpen(true);
  };

  

  //currentWeather関数（モックデータ）から現在の天気データ(type)を取り出す
  const type = currentWeatherData.type;
  //現在の天気に対応する天気のアイコンを選択する(typeは "const type" のtype)
  const IconComponent = WEATHER_ICONS[type]; //これをpropsで渡す
  //getIconClass関数から色情報を取り出す
  const iconClass =  getIconClass(type);     //これをpropsに渡す

  
  /**
   * hourly-weather-cardコンポーネント用のモックデータ
   */
  //時間ごとの天気予想のモックデータ
  const hourlyWeatherData: HourlyWeatherType[] = [
    { time: "Now", icon: <Sun size={30} />, temp: "27°" },
    { time: "12:00", icon: <Sun size={30} />, temp: "27°" },
    { time: "15:00", icon: <Sun size={30} />, temp: "28°" },
    { time: "18:00", icon: <Sun size={30} />, temp: "26°" },
    { time: "21:00", icon: <Sun size={30} />, temp: "22°" },
    { time: "0:00", icon: <Sun size={30} />, temp: "19°" },
    { time: "3:00", icon: <Sun size={30} />, temp: "17°" },
  ];

  /**
   * daily-weather-card.tsxコンポーネント用のモックデータ
   */
  //１週間の天気予想のモックデータ
  const dailyWeatherData: WeatherItem[] = [
    //iconは一時的に表示ように設定したので外部データを取得した時に消去すること
    {
      day: "Today",
      type: "sunny",
      min: 15,
      max: 27,
      percentage: 60,
      icon: <Sun />,
    },
    {
      day: "Mon",
      type: "rainy",
      min: 16,
      max: 28,
      percentage: 60,
      icon: <CloudRain />,
    },
    {
      day: "Tue",
      type: "cloudy",
      min: 14,
      max: 26,
      percentage: 50,
      icon: <Cloud />,
    },
    {
      day: "Wed",
      type: "sunny",
      min: 17,
      max: 29,
      percentage: 80,
      icon: <Sun />,
    },
    {
      day: "Thu",
      type: "sunny",
      min: 15,
      max: 25,
      percentage: 40,
      icon: <Sun />,
    },
    {
      day: "Fri",
      type: "sunny",
      min: 18,
      max: 30,
      percentage: 90,
      icon: <Sun />,
    },
  ];

  //今日の天気データ(WeatherDataの＊番目の要素)を取得する
  const todayWeather = dailyWeatherData[1];
  //今日の天気の種類に応じて背景クラスを決定する
  const bgClass = getBgClass(todayWeather.type);

  return (
    <main
      className={`min-h-screen max-w-md w-full mx-auto p-4 space-y-4 ${bgClass}`}
    >
      <h1 className="text-center font-semibold">Weather Forecast</h1>

      <div>
        <CurrentWeatherCard
          weather={currentWeatherData}
          openSearchModal={openSearchModal}
          IconComponent={IconComponent}
          iconClass={iconClass}
        />
      </div>

      <div>
        <HourlyWeatherCard weather={hourlyWeatherData} />
      </div>

      <div>
        {/* weatherをdailyWeatherCardにpropsとして渡す */}
        <DailyWeatherCard weather={dailyWeatherData} />
      </div>
    </main>
  );
}
