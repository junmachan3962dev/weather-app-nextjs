import { getWeatherByCity } from "@/lib/openWeather";

export default async function TestPage() {
  const city = "盛岡";
  const { cityName, weatherData } = await getWeatherByCity(city);
  const forecastList = weatherData.list;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>テストページ: {cityName}の天気予報</h1>
      <p>APIから正常にデータを取得できました！</p>

      <h2>直近の天気データ（最初の予報）</h2>
      {forecastList.length > 0 && (
        <div style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px", maxWidth: "400px" }}>
          <p><strong>日時：</strong> {forecastList[0].dt_txt}</p>
          <p><strong>気温：</strong> {forecastList[0].main.temp} ℃</p>
          <p><strong>天気：</strong> {forecastList[0].weather[0].description}</p>
          <p><strong>湿度：</strong> {forecastList[0].main.humidity} %</p>
        </div>
      )}
    </main>
  );
}