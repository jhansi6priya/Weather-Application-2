import { useEffect, useState, useCallback, useRef } from "react";

//importing the API functions from API call
import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "../services/weatherApi";

//importing the formatter functions from the utils
import {
  formatCurrentWeather,
  formatForecastWeather,
} from "../utils/weatherFormatter";

export default function useWeather(city) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Using useEffect hook to fetch by city - so whenever a user types a new city then the useEffect will render the callback function
  useEffect(() => {
    if (!city) return;
    async function fetchByCity() {
      try {
        setLoading(true);
        setError(null);

        const currentData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);
        const formattedWeather = formatCurrentWeather(currentData);
        setCurrent(formattedWeather);
        setForecast(formatForecastWeather(forecastData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchByCity();
  }, [city]);

  const debounceRef = useRef(null);

  const fetchByLocation = useCallback(() => {
  if (debounceRef.current) clearTimeout(debounceRef.current);

  debounceRef.current = setTimeout(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          setError(null);

          const { latitude, longitude } = position.coords;

          const [currentData, forecastData] = await Promise.all([
            getCurrentWeatherByCoords(latitude, longitude),
            getForecastByCoords(latitude, longitude),
          ]);

          setCurrent(formatCurrentWeather(currentData));
          setForecast(formatForecastWeather(forecastData));
        } catch {
          setError("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
      }
    );
  }, 2000); // debounce delay
}, []);

  // const fetchByLocation = useCallback(() => {

  //   if (!navigator.geolocation) {
  //     setError("Geolocation not supported");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       try {
  //         setLoading(true);
  //         setError(null);

  //         const { latitude, longitude } = position.coords;

  //         const [currentData, forecastData] = await Promise.all([
  //           getCurrentWeatherByCoords(latitude, longitude),
  //           getForecastByCoords(latitude, longitude),
  //         ]);

  //         setCurrent(formatCurrentWeather(currentData));
  //         setForecast(formatForecastWeather(forecastData));
  //       } catch {
  //         setError("Unable to fetch location weather");
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     () => {
  //       setError("Location permission denied");
  //     },
  //   );
  // }, []);

  useEffect(() => {
    fetchByLocation();
  }, []);

  return {
    current,
    forecast,
    loading,
    error,
    fetchByLocation,
  };
}
