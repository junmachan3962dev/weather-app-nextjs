import type { CurrentWeather } from "@/types/Weather";

import {
  WEATHER_COLOR_MAP,
  WEATHER_ICON_MAP,
  WEATHER_LABEL_MAP,
} from "@/utils/weather-map";

//propsが増えたときに拡張しやすいので型をまとめる
interface CurrentWeatherProps {
  currentData: CurrentWeather;
}

export function CurrentWeatherComponent({ currentData }: CurrentWeatherProps) {
  //アイコン名に対応するコンポーネントを取得する
  //万が一iconが不正な値でもアプリが壊れないようにデフォルト値を設定する
  const Icon =
    WEATHER_ICON_MAP[currentData.icon] ?? WEATHER_ICON_MAP["Default"];
  //アイコンの色をマップから取得（存在しない場合はDefault)
  const iconColor =
    WEATHER_COLOR_MAP[currentData.icon] ?? WEATHER_COLOR_MAP["Default"];
  return (
    <section className="flex items-center justify-between p-4">
      {/* 左コンテンツエリア */}
      <div className="flex items-center justify-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold">{currentData.city}</h2>
          <div className="w-[120px] text-5xl font-bold tracking-tight">
            {currentData.temp}
            <span className="text-3xl">°c</span>
          </div>
          {/* 最高気温、最低気温 表示エリア */}
          <div className="text-xl font-semibold">
            <span>{currentData.tempMax}°/</span>
            <span>{currentData.tempMin}°</span>
          </div>
        </div>
        {/* 天気アイコンコンポーネント */}
        <Icon className={`w-14 h-14 ${iconColor}`} />
      </div>
      {/* 右コンテンツエリア */}
      <div>
        {/*  conditionを日本語に変換して表示 */}
        <div className="text-2xl font-semibold">
          {WEATHER_LABEL_MAP[currentData.condition]}
        </div>
        <div className="font-medium text-base">
          降水確率
          <span className="inline-block w-[35px] font-bold text-right">
            {currentData.precipitation}
          </span>
          %
        </div>
      </div>
    </section>
  );
}
