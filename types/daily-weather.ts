/**
 * 天気の種類を定義
 */
export type WeatherType = 'sunny' | 'rainy' | 'cloudy';

/**
 * 1日分の天気予想データの型定義（週間予想データの型定義）
 */
export interface WeatherItem {
    day: string;        //曜日や日付
    type: WeatherType;  //天気の状態
    min: number;        //最低気温
    max: number;        //最高気温
    percentage: number; //気温プログレスバーの割合
    icon: React.ReactNode; //天気アイコンを追加
}

