import { useWeatherContext } from "../context/WeatherContext";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastSection from "../components/ForecastSection";
import WeatherHighlights from "../components/WeatherHighlights";
import ErrorMessage from "../components/ErrorMessage";

export default function Dashboard() {
  // const[value, setValue] = useState("lksdfj");
  const { setCity, current, forecast, loading, error, fetchByLocation } =
    useWeatherContext();
  console.log(current);

const handleSearch = (searchedCity) => {
  setCity(searchedCity);
};
  
  return (
    <div className="dashboard">
      <div className="search-panel">
        <SearchBar onSearch={handleSearch} onLocate={fetchByLocation}/>
      </div>

      <div className="error-panel">{error && <ErrorMessage error={error} />}</div>
      {loading && ( <div className="loader-wrapper"> <div className="spinner" /> </div> )}
      <div className="weather-panel">
        <div className="left-panel">

          {current && !error && !loading && <CurrentWeather data={current} />}
          {forecast && !error && !loading && <ForecastSection forecast={forecast} />}
          {/* {current && <CurrentWeather data={current} />} */}
          {/* {forecast && <ForecastSection forecast={forecast} />} */}
        </div>

        <div className="right-panel">
          {current && !error && !loading && <WeatherHighlights data={current} />}
        </div>
      </div>

      {/*       
      <div>
        <input type="text" onChange={(e) => setValue(e.target.value)} />
        <h1>{value}</h1>
      </div> */}
    </div>
  );
}
