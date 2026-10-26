"use client";
import type { WeatherApiResponse } from "@/types/Weather";
import { convertOpenWeatherToAppData } from "@/utils/weather-map";
import { useEffect, useState } from "react";

//ここではブラウザで緯度経度を取得してapiに投げ、その結果をエラーハンドリングしている
export default function WeatherSearch() {
  //変換関数によってデータの構造が変わるため変換後の型が必要
  const [weatherData, setWeatherData] = useState<ReturnType<
    typeof convertOpenWeatherToAppData
  > | null>(null);

  function handleGetLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          //fetch()の第２引数に渡すリクエスト設定オブジェクト
          const response = await fetch("/api/weather", {
            //HTTPリクエストのメゾットを指定（今回はPOST)
            method: "POST",
            headers: {
              //リクエストボディのデータ形式がJSONであることを指定
              "Content-type": "application/json",
            },
            //緯度・経度を含んだリクエストボディをJSON文字列にして送信
            body: JSON.stringify({ lat, lon }),
          });

          //HTTPレスポンスが正常か確認する
          //ここではHTTPステータスが２００〜２９９の範囲ならtrueになる
          if (!response.ok) {
            throw new Error(`天気情報の取得に失敗しました：${response.status}`);
          }

          const data = await response.json();
          /*console.log(data);*/
          const mappedData = convertOpenWeatherToAppData(
            data.weatherData as WeatherApiResponse,
          );

          setWeatherData(mappedData);
        } catch (error) {
          console.error("天気情報の取得に失敗しました:", error);
        }
      },
      //ここは位置情報の取得のエラー
      (error) => {
        console.error("位置情報の取得に失敗しました：", error.message);
      },
    );
  }

  //初回表示時やリロード時にhandleGetLocation関数(現在地のデータ取得）を実行する
  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <section>
      <button type="button" onClick={handleGetLocation}>
        現在地の天気を取得
      </button>
    </section>

    
  );
}

/* 
// === データの受け渡しの流れ ===
1. buttonが押される
2. handleGetLocation()が実行されブラウザの現在地の位置情報の緯度・経度を取得する
3. その緯度・経度をapi/weather/route.ts → lib/openweather.ts → weatherDataとsityNameのデータを受け取る
4. APIから帰ってきたデータを受け取り、変換して、stateに保存する
*/
