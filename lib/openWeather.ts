// --- 共通処理：API通信とエラーチェック（サーバー側）---

//APIキーを環境変数から取得する
const apiKey = process.env.OPENWEATHER_API_KEY;
//APIキーが設定されていなければエラーにする
if (!apiKey) {
  throw new Error("OpenWeather APIキーが設定されていません。");
}

// APIにリクエストを送り、レスポンスをJSONデータとして返す共通関数
async function fetchOpenWeather(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API通信に失敗しました： ${response.status}`);
  }

  return response.json();
}

// === 都市名から天気予報を取得する処理　===

// ⓵ 検索された都市名から緯度・経度を取得する
export async function getCoordinatesByCity(city: string) {
  // [encodeURIComponent]によりcity(都市名)が日本語でも正しく受け取ることができる
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
  //ジオコーディングAPIにリクエストを送り、検索結果を取得する
  const data = await fetchOpenWeather(url);

  //検索結果が空の配列（空文字とは別なのでそれはroute.tsで処理する）の場合はエラーメッセージで知らせる（route.ts側のcatchで受け取る）
  if (!data.length) {
    throw new Error("CITY_NOT_FOUND");
  }

  //fetchOpenWeather関数から緯度・経度、都市名を取得する
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
  };
}

// ⓶ 緯度・経度から天気予報を取得する
export async function fetchWeatherData(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
  return await fetchOpenWeather(url);
}

// ⓷ ⓵と⓶を順番に呼び出し、都市名から天気予報を取得する
export async function getWeatherByCity(city: string) {
  const { lat, lon, name } = await getCoordinatesByCity(city);
  const weatherData = await fetchWeatherData(lat, lon);
  return { cityName: name, weatherData };
}

/* 
=== 処理の流れ ===
1. getCoordinatesByCity()で該当する都市の緯度・経度を取得する（ジオコーディング）
2. 取得した緯度・経度をfetchWeatherData()で受け取り
   fetchOpenWeather()に天気データ取得のためのurlを送る 
3. fetchOpenWeather()がAPIからデータを受け取りデータを返す 
＊ getWeatherByCity()はAPIでの処理の流れを指揮する司令塔の役割
*/


// 現在地の緯度・経度から天気を取得する (weatherSearch.tsxのブラウザから取得した緯度・経度）
export async function getWeatherByCoordinates(lat: number, lon: number) {
    const weatherData = await fetchWeatherData(lat, lon);
    const name = weatherData.city.name;

    return {cityName: name, weatherData};
}