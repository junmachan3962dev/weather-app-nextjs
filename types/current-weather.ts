/**
 * 現在の天気データの型定義
 */
export interface CurrentWeatherType {
    city: string;          //地域名
    temp: number;          //現在の天気
    weather: string;        //天気の説明(sunny,cloudy など)
    high: number;          //今日の最高気温
    low: number            //今日の最低気温
    icon: React.ReactNode; //天気アイコン（Lucideなど)
}
