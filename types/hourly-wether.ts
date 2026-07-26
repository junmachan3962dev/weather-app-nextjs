import { WeatherType } from "./weather-type";

export interface HourlyWeatherType {
    time: string;
    icon: WeatherType;
    temp: string;
}