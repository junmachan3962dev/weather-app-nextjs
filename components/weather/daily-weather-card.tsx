import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Sun } from "lucide-react";
import {WeatherItem} from "@/types/daily-weather";

//DailyWeatherCardコンポーネントが受け取るpropsの型
//weatherには週間天気のWeatherItemの配列を渡す
type DailyWeatherCardProps = {
  weather: WeatherItem[];
}

export function DailyWeatherCard({weather}: DailyWeatherCardProps) {
  return (
    //カード全体の見た目（背景投下や境界線）を設定
    <Card className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4">
      <CardHeader className="flex justify-between">
        {/* セクションタイトル：カレンダーアイコンとテキスト */}
        <CardTitle className="flex items-center gap-1 font-semibold">
          <CalendarDays size={16} />
          <span className="text-sm font-medium">5-DAYS FORECAST</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 天気予報リストのコンテナ */}
        <ul className="space-y-2">
          {/* WeatherDataから各日のデータを展開してループ処理 */}
          {weather.map((item) => (
            <li key={item.day} className="flex justify-between items-center gap-2">
              {/* 日付と天気アイコンの表示エリア */}
              <div className="flex justify-between w-24 font-bold">
                <span>{item.day}</span>
                <span>{item.icon}</span>
              </div>
              {/* 気温表示とプログレスバーのエリア */}
              <div className="flex flex-1 items-center ml-4 gap-2 font-bold">
                {/* 最低気温 */}
                <span className="w-8 text-right">{item.min}</span>
                {/* 気温変化を表現するプログレスバー本体 */}
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  {/* 温度の割合に応じた幅の変化 */}
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                {/* 最高気温 */}
                <span className="w-6">{item.max}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
