import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//lucide-reactからアイコンをインポート
import {Sun, Clock} from 'lucide-react'


export function HourlyWeatherCard() {
  return (
    //ガラスモーフィズム適用
    <Card className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4">
      {/* カードヘッダー */}
      <CardHeader className="flex justify-between mb-[-4]">
        <CardTitle className="flex items-center gap-1 font-semibold">
            <Clock size={16} />
            <span className="text-sm font-medium">HOURLY FORECAST</span>
        </CardTitle>
      </CardHeader>
      {/* 時間ごとの天気予報リスト */}
      <CardContent>
            {/* 横スクロール対応リスト：スクロールバー非表示 */}
            <ul className="flex overflow-x-auto pl-2 snap-proximity scroll-smooth  scrollbar-none">
                {/* 現在の時刻のアイテム：強調のための追加のグラスモーフィズム */}
                <li className="hourly-item backdrop-blur-sm bg-white/10 border border-white/30 rounded-lg">
                    <p>Now</p>
                    <Sun />
                    <p>27°</p>
                </li>
                {/* 未来の予報アイテム */}
                <li className="hourly-item">
                    <p>12:00</p>
                    <Sun />
                    <p>27°</p>
                </li>
                <li className="hourly-item">
                    <p>15:00</p>
                    <Sun />
                    <p>28°</p>
                </li>
                <li className="hourly-item">
                    <p>18:00</p>
                    <Sun />
                    <p>26°</p>
                </li>
                <li className="hourly-item">
                    <p>21:00</p>
                    <Sun />
                    <p>22°</p>
                </li>
                <li className="hourly-item">
                    <p>0:00</p>
                    <Sun />
                    <p>19°</p>
                </li>
                <li className="hourly-item">
                    <p>3:00</p>
                    <Sun />
                    <p>17°</p>
                </li>
            </ul>
      </CardContent>
    </Card>
  );
}
