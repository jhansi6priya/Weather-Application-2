import { useNavigate } from "react-router-dom";
import useFavourites from "../hooks/useFavourites";
import { useWeatherContext } from "../context/WeatherContext";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();
  const { setCity } = useWeatherContext();
  const navigate = useNavigate();

  const handleSelect = (city) => {
    setCity(city);
    navigate("/");
  };

  return (
    <div className="favourites-page">
      <h2>Saved Locations</h2>

      {favourites.length === 0 && <p>No saved cities.</p>}

      <div className="favourites-list">
        {favourites.map(city => (
          <div key={city} className="fav-item" onClick={() => handleSelect(city)}>
            <span>
              {city}
            </span>
            <button onClick={(e) => {
              e.stopPropagation();
              removeFavourite(city);}}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
