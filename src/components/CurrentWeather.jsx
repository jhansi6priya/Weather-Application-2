import weatherIconMap from "../utils/weatherIcons";
import useFavourites from "../hooks/useFavourites";
import {memo} from "react";

export default memo(function CurrentWeather({ data }) {

  const { addFavourite } = useFavourites();
  if (!data) return null;

  const icon =
  weatherIconMap[data.condition] || weatherIconMap["Clear"];

  return (
    <section className="current-weather card">
      <div className="cw-main">
        <div>
          <h2 className="city">{data.city}</h2>
          <button className="favourites-btn" onClick={() => addFavourite(data.city)}>⭐</button>
          <p className="date">{data.date}</p>

          <h1 className="temp">{data.temperature}°C</h1>
          <p className="condition">{data.condition}</p>
        </div>

        <img src={icon} alt={data.condition} />
      </div>

      <div className="cw-extra">
        <p>🌅 Sunrise: {data.sunrise}</p>
        <p>🌇 Sunset: {data.sunset}</p>
      </div>
    </section>
  );
});
