//天気の種類の定義
export type WeatherType = "晴れ" | "曇り" | "雨" | "雪";

//現在の天気の型定義
export interface CurrentWeather {
    city: string;
    condition: WeatherType;
    icon: string;
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
    icon: string;
    temp: number;
    tempMax: number;
    tempMin: number;
    precipitation: number;
}

//週間天気の型定義
export interface DailyWeatehr {
    day: string;
    condition: WeatherType;
    icon: string;
    tempMax: number;
    tempMin: number;
    precipitation: number;
}

export interface WeatherData {
    current: CurrentWeather;
    hourly: HourlyWeather[];
    daily: DailyWeatehr[];
}