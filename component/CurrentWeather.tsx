import type { CurrentWeather } from "@/types/Weather";
import { WEATHER_COLOR_MAP, WEATHER_ICON_MAP, WEATHER_LABEL_MAP } from "@/utils/weather-map";

//propsが増えたときに拡張しやすいので型をまとめる
interface CurrentWeatherProps {
  currentData: CurrentWeather;
}

export function CurrentWeather({ currentData }: CurrentWeatherProps) {
  //アイコン名に対応するコンポーネントを取得する
  //万が一iconが不正な値でもアプリが壊れないようにデフォルト値を設定する
  const Icon = WEATHER_ICON_MAP[currentData.icon] ?? WEATHER_ICON_MAP["Default"];
  //アイコンの色をマップから取得（存在しない場合はDefault)
  const iconColor = WEATHER_COLOR_MAP[currentData.icon] ?? WEATHER_COLOR_MAP["Default"];
  return (
    <section>
      {/* 左コンテンツエリア */}
      <div>
        <div>
          <h2>{currentData.city}</h2>
          <div>
            {currentData.temp}
            <span>°c</span>
          </div>
          {/* 最高気温、最低気温 表示エリア */}
          <div>
            <span>{currentData.tempMax}°/</span>
            <span>{currentData.tempMin}°</span>
          </div>
        </div>
        {/* 天気アイコンコンポーネント */}
        <Icon />
      </div>
      {/* 右コンテンツエリア */}
      <div>
        {/*  conditionを日本語に変換して表示 */}
        <div>
          {WEATHER_LABEL_MAP[currentData.condition]}
        </div>
        <div>降水確率<span>{currentData.precipitation}</span>%</div>
      </div>
    </section>
  );
}
