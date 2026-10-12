// === UIデータの型定義 ===
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

// === APIレスポンスのデータ構造の型定義 ===
//APIレスポンス全体のデータ構造
export interface WeatherApiResponse {
    list: WeatherListItem[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

//"list"の１要素のデータ構造
export interface WeatherListItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number; //体感温度
        temp_min: number;
        temp_max: number;
        pressure: number; //気圧
        humidity: number; //湿度
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    pop: number; //降水確率（0〜１）
    dt_txt: string; //"YYYY-MM-DD HH:mm:ss"
}

