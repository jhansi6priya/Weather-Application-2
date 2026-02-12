import { useParams } from "react-router-dom";
import useWeather from "../hooks/useWeather";

export default function WeatherDetails() {
  const { city } = useParams();
  const { current, loading, error } = useWeather(city);

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "white" }}>{error}</h2>;
  if (!current) return null;

  return (
    <div className="details-page">
      <div className="details-card">
        <h2>Weather Details — {current.city}</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span>🌡 Temperature</span>
            <h3>{current.temperature}°C</h3>
          </div>

          <div className="detail-item">
            <span>🤒 Feels Like</span>
            <h3>{current.feelsLike}°C</h3>
          </div>

          <div className="detail-item">
            <span>💧 Humidity</span>
            <h3>{current.humidity}%</h3>
          </div>

          <div className="detail-item">
            <span>🌬 Wind Speed</span>
            <h3>{current.windSpeed} km/h</h3>
          </div>

          <div className="detail-item">
            <span>📊 Pressure</span>
            <h3>{current.pressure} hPa</h3>
          </div>

          <div className="detail-item">
            <span>👀 Visibility</span>
            <h3>{current.visibility} m</h3>
          </div>

          <div className="detail-item">
            <span>🌅 Sunrise</span>
            <h3>{current.sunrise}</h3>
          </div>

          <div className="detail-item">
            <span>🌇 Sunset</span>
            <h3>{current.sunset}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
