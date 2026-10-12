import type {
  WeatherType,
  WeatherApiResponse,
  WeatherListItem,
} from "@/types/Weather";

import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  HelpCircle,
} from "lucide-react";

//=== 天気の種類に対応するアイコンコンポーネントのマップ ===
export const WEATHER_ICON_MAP = {
  Sun: Sun,
  CloudSun: CloudSun,
  Cloud: Cloud,
  CloudRain: CloudRain,
  CloudSnow: CloudSnow,
  Default: HelpCircle,
} as const;

//=== 天気の種類に対応する日本語ラベルのマップ ===
export const WEATHER_LABEL_MAP = {
  Sun: "晴れ",
  CloudSun: "晴れ時々曇り",
  Cloud: "曇り",
  CloudRain: "雨",
  CloudSnow: "雪",
} as const;

//=== 天気の種類に対応するアイコンの色クラスのマップ ===
export const WEATHER_COLOR_MAP = {
  Sun: "text-yellow-400",
  CloudSun: "text-yellow-400",
  Cloud: "text-gray-400",
  CloudRain: "text-blue-400",
  CloudSnow: "text-blue-200",
  Default: "text-yellow-400",
} as const;

//=== OpenWeatherの天気表記をアプリ内のWeatherTypeに変換するマップ ===
const WEATHER_TYPE_MAP: Record<string, WeatherType> = {
  clear: "Sun",
  clouds: "CloudSun",
  cloud: "Cloud",
  rain: "CloudRain",
  snow: "CloudSnow",
};
//APIから受け取った天気の種類をマップで変換して、対応するWeatherTypeに変換する関数
export function mapOpenWeatherToType(mainCondition: string) {
  const normalized = mainCondition.toLowerCase();
  return WEATHER_TYPE_MAP[normalized] ?? "CloudSun";
}

//=== UTC（世界時間）から任意の都市の現地時間に変換するヘルパー関数 ===
//UTC の UNIX秒(dt) と 都市の timezone（秒）を使って現地時間に変換する
function formatLocalTime(dt: number, timezone: number) {
  if (!dt) return "00:00";
  //UTC → 現地時間（timezone は秒）
  const localDate = new Date((dt + timezone) * 1000);
  //padStartは文字列専用なので時間を文字列にするためにStringを使用
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

/* === APIの生データをアプリの形やモックの形に変換するための翻訳関数 === */
//OpenWeather全体の生データから、アプリのコンポーネントが求める構造に変換する関数
export function convertOpenWeatherToAppData(apiResponse: WeatherApiResponse) {
  const list = apiResponse.list ?? []; //APIのjsonデータ(apiResponse)から"list"を取得
  const currentItem = list[0] ?? {}; //現在の天気は、一番目の"list"を取得
  const main = currentItem.main ?? {}; //現在の天気の"main"のデータを取得
  const weather = currentItem.weather?.[0] ?? {}; //現在の天気の"weather"のデータを取得

  // APIのjsonデータ(apiResponse)から都市名を取得（取得できない場合はデフォルトで "盛岡市"）
  const cityName = apiResponse.city.name ?? "盛岡市";
  // 都市のtimezoneを取得する（取得できない場合は 0）
  const timezoneOffset = apiResponse.city.timezone ?? 0;

  // --- 1. Hourly データ（時間ごと・最大8件＝24時間分）---
  //slice(0, 8) で list の頭(0)から8件分(8)切り出している
  const hourly = list.slice(0, 8).map((item: WeatherListItem) => {
    const itemMain = item.main ?? {};
    const itemWeather = item.weather?.[0] ?? {};
    return {
      //UIに使えるように整形して値を返す(各ヘルパー関数で変換する)
      time: formatLocalTime(item.dt, timezoneOffset),
      condition: mapOpenWeatherToType(itemWeather.main ?? "clear"),
      icon: mapOpenWeatherToType(itemWeather.main ?? "clear"),
      temp: Math.round(itemMain.temp ?? 0),
      tempMax: Math.round(itemMain.temp_max ?? 0),
      tempMin: Math.round(itemMain.temp_min ?? 0),
      precipitation: Math.round((item.pop ?? 0) * 100), //0~1の少数なので*100
    };
  });

  // --- 2. Daily データ（日別・5日分を日付ごとにグループ化して集計）---
  const dailyMap = new Map<string, WeatherListItem[]>(); //仕分け用の箱（Map）を用意する
  //仕分け用の箱（dailyMap）に日付と値をグループ化する
  list.forEach((item: WeatherListItem) => {
    if (!item.dt_txt) return; //データがない時にアプリがクラッシュしないためのガード
    const dateKey = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD"の部分を抜き出す
    //has set はMapオブジェクトのメソッド(日毎の箱にキーと値のグループを作る)
    if (!dailyMap.has(dateKey)) {
      //hasでそのキーが存在するか調べる（重複しないように）
      dailyMap.set(dateKey, []); //setでキーと値を登録する（値はまだ登録されていない空配列）
    }
    //getでキーに対応する値を取得する。pushでlistを追加する。
    dailyMap.get(dateKey)?.push(item);
  });

  //曜日の配列を作る
  const daysOfWeek = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];

  //３時間毎のデータを日付毎に分けて5日分グループ化し値の空配列にデータを注入する関数
  //⓵Array.fromは()内を配列に変換する。 ⓶dailyMap.entries()は日付とデータのセットを取り出す。
  const daily = Array.from(dailyMap.entries())
    .slice(0, 5)
    .map(([dateKey, items], index) => {
      let maxTemp = -999;
      let minTemp = 999;
      let maxPop = -1;

      items.forEach((item: WeatherListItem) => {
        const tMax = item.main.temp_max ?? item.main.temp ?? 0;
        const tMin = item.main.temp_min ?? item?.main.temp ?? 0;
        const pop = item.pop ?? 0;
        //現在の最大値より高ければ、最高気温の最大値を更新する
        if (tMax > maxTemp) maxTemp = tMax;
        //現在の最大値より低ければ最低気温の最小値を更新する
        if (tMin < minTemp) minTemp = tMin;
        //現在の最大値より高ければ、最大降水確率を更新する
        if (pop > maxPop) maxPop = pop;
      });

      //曜日(daysOfWeek)の配列にデータのindexを当てはめる処理
      let dayLabel = ""; //初期値は空のデータ

      if (index === 0) {
        dayLabel = "今日";
      } else {
        //()内は文字列をDateオブジェクトに変換している（このままだと中身を計算できなくなるので）
        const utcDate = new Date(`${dateKey}T00:00Z`);
        //getUTCDay() で曜日の配列を割り当てている
        dayLabel = daysOfWeek[utcDate.getUTCDay()];
      }

      const condition = items[0]?.weather?.[0]?.main ?? "Clear";
      return {
        day: dayLabel,
        condition: mapOpenWeatherToType(condition),
        icon: mapOpenWeatherToType(condition),
        tempMax: Math.round(maxTemp),
        tempMin: Math.round(minTemp),
        precipitation: Math.round((maxPop ?? 0) * 100),
      };
    });

  return {
    current: {
      city: cityName,
      condition: mapOpenWeatherToType(weather.main ?? "clear"),
      icon: mapOpenWeatherToType(weather.main ?? "clear"),
      temp: Math.round(main.temp ?? 0),
      tempMax: Math.round(main.temp_max ?? 0),
      tempMin: Math.round(main.temp_min ?? 0),
      time: formatLocalTime(currentItem.dt, timezoneOffset),
      precipitation: Math.round((currentItem.pop ?? 0) * 100),
    },
    hourly,
    daily,
  };
}
