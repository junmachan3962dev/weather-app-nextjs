//天気の種類の定義
export type WeatherType = "Sun" | "Cloud" | "CloudSun" | "CloudRain" | "CloudSnow";

//現在の天気の型定義
export interface CurrentWeather {
    city: string;
    condition: WeatherType;
    icon: WeatherType;
    temp: number;
    tempMax: number;
    tempMin: number;
    time: string;
    precipitation: number;  //降水確率
}

//３時間ごとの天気の型定義
export interface HourlyWeather {
    time: string;
    condition: WeatherType;
    icon: WeatherType;
    temp: number;
    tempMax: number;
    tempMin: number;
    precipitation: number;
}

//週間天気の型定義
export interface DailyWeather {
    day: string;
    condition: WeatherType;
    icon: WeatherType;
    tempMax: number;
    tempMin: number;
    precipitation: number;
}

//モックデータの型定義
export interface WeatherData {
    current: CurrentWeather;
    hourly: HourlyWeather[];
    daily: DailyWeather[];
}