import { NextResponse } from "next/server";
import { getWeatherByCoordinates } from "@/lib/openWeather";

//＊このコードはブラウザの位置情報API(Geolocation API)からのjsonデータをAPIロジックに送るためのコード
export async function POST(request: Request) {
  //Requestはブラウザが提供する型
  // 1.bodyをunknown型に定義しif文で下記のようにバリデーションする
  let body: unknown;
  //ブラウザ側からデータを受けてそのtry~catchの処理をする
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストのJSON形式が正しくありません" },
      { status: 400 },
    );
  }
  try {
    //オブジェクトでない時、null値であるとき、配列である時はエラーを表示する
    if (typeof body !== "object" || body == null || Array.isArray(body)) {
      return NextResponse.json(
        { error: "リクエストの形式が不正です。" },
        { status: 400 },
      );
    }

    // 2.lat,lonをバリデーションでnumber型を確定させる
    const { lat, lon } = body as Record<string, unknown>;
    //入力値（lat,lon)のバリデーション(下記の⓵〜⓷を確認する)
    //⓵数値型か？②数値が有限か？⓷緯度が−９０〜９０、経度が−１８０〜１８０の範囲内か？
    if (
      typeof lat !== "number" ||
      typeof lon !== "number" ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      return NextResponse.json(
        { error: "緯度または経度が不正です" },
        { status: 400 }, //不正な値なら400を返す
      );
    }

    //正しいデータとして確定した後にサーバーに緯度、軽度のデータを渡す
    const result = await getWeatherByCoordinates(lat, lon);

    //NextResponseによってブラウザに返せるJSON形式のHTTPレスポンスに組み立ててくれる
    return NextResponse.json(result); //NextResponseはnext.jsが提供するクラス
  
  //サーバー側で予期しないエラーが発生した場合は500を返す
  } catch (error) {
    return NextResponse.json(
      { error: "天気データの取得に失敗しました。" },
      { status: 500 },
    );
  }
}
