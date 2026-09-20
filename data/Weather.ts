import { WeatherData } from "@/types/Weather";

export const mockWeatherData: WeatherData = {
  current: {
    city: "盛岡市",
    condition: "Sun",
    icon: "Sun",
    temp: 22,
    tempMax: 25,
    tempMin: 16,
    time: "14:00",
    precipitation: 10,
  },

  hourly: [
    {
      time: "15:00",
      condition: "Sun",
      icon: "Sun",
      temp: 24,
      tempMax: 25,
      tempMin: 16,
      precipitation: 10,
    },
    {
      time: "18:00",
      condition: "Cloud",
      icon: "Cloud",
      temp: 20,
      tempMax: 22,
      tempMin: 16,
      precipitation: 30,
    },
    {
      time: "21:00",
      condition: "CloudRain",
      icon: "CloudRain",
      temp: 18,
      tempMax: 19,
      tempMin: 15,
      precipitation: 60,
    },
  ],

  daily: [
    {
      day: "今日",
      condition: "Sun",
      icon: "Sun",
      tempMax: 25,
      tempMin: 16,
      precipitation: 10,
    },
    {
      day: "日曜",
      condition: "CloudRain",
      icon: "CloudRain",
      tempMax: 20,
      tempMin: 12,
      precipitation: 80,
    },
    {
      day: "月曜",
      condition: "Cloud",
      icon: "Cloud",
      tempMax: 22,
      tempMin: 15,
      precipitation: 30,
    },
  ],
};
