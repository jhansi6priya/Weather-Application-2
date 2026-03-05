import { useWeatherContext } from "../context/WeatherContext";
import Details from "../components/Details";

export default function WeatherDetails() {
  // const[value, setValue] = useState("lkdjd");
  const { current, loading, error } = useWeatherContext();
  return (
    <div className="details-page">
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {current && !loading && !error && (
        <Details data={current} />
      )}
    </div>
  );
}