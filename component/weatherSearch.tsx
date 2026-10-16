"use client";

//ここではブラウザで緯度経度を取得してapiに投げ、その結果をエラーハンドリングしている
export default function WeatherSearch() {
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
            //緯度・経度のオブジェクトをJSON文字列に変換して送信
            body: JSON.stringify({ lat, lon }),
          });

          //HTTPレスポンスが正常か確認する
          //ここではHTTPステータスが２００〜２９９の範囲ならtrueになる
          if (!response.ok) {
            throw new Error(`天気情報の取得に失敗しました：${response.status}`);
          }

          const data = await response.json();
          console.log(data);
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

  return (
    <section>
      <button type="button" onClick={handleGetLocation}>
        現在地の天気を取得
      </button>
    </section>
  );
}
