export default function Details({data}) {
  return (
    <div className="details-card">
      <h2>Weather Details — {data.city}</h2>

      <div className="details-grid">
        <div className="detail-item">
          <span>🌡 Temperature</span>
          <h3>{data.temperature}°C</h3>
        </div>

        <div className="detail-item">
          <span>🤒 Feels Like</span>
          <h3>{data.feelsLike}°C</h3>
        </div>

        <div className="detail-item">
          <span>💧 Humidity</span>
          <h3>{data.humidity}%</h3>
        </div>

        <div className="detail-item">
          <span>🌬 Wind Speed</span>
          <h3>{data.windSpeed} km/h</h3>
        </div>

        <div className="detail-item">
          <span>📊 Pressure</span>
          <h3>{data.pressure} hPa</h3>
        </div>

        <div className="detail-item">
          <span>👀 Visibility</span>
          <h3>{data.visibility} m</h3>
        </div>

        <div className="detail-item">
          <span>🌅 Sunrise</span>
          <h3>{data.sunrise}</h3>
        </div>

        <div className="detail-item">
          <span>🌇 Sunset</span>
          <h3>{data.sunset}</h3>
        </div>
      </div>
    </div>
  );
}
