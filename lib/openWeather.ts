import {WeatherData} from '@/types/Weather';

//OpenWeather APIから天気データを取得する関数
export async function fetchWeatherData(city: "Morioka"): promise<WeatherData> {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!API_KEY) {
        throw new Error("OpenWeather APIキーが設定されていません。");

        
    }
}