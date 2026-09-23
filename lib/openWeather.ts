// --- 共通のエラーチェックとfetch用のヘルパー関数（サーバーサイド専用）---
async function fetchOpenWeather(url: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("OpenWeather APIキーが設定されていません。");
    }

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`API通信に失敗しました： ${response.status}`);
    }

    return response.json();
}

// --- 直接ジオコーディングで取得した緯度・経度を元にした天気情報の取得　---
//1. 都市名から緯度・経度を取得
export async function getCoordinatesByCity(city: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    // [encodeURIComponent]によりcity(都市名)が日本語でも正しく受け取ることができる
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const data = await fetchOpenWeather(url);

    if (!data.length) {
        throw new Error(`指定された都市が見つかりませんでした： ${city}`);
    }
    
    return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
    };
}

//2. 緯度・経度から天気予報を取得
export async function fetchWeatherData(lat: number, lon: number) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
    return await fetchOpenWeather(url);
}

// --- APIでの処理を指示し必要なデータを取得するための司令塔の関数 ---
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