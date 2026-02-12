import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_URL;

export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return res.json();
}

export async function getForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Forecast not available");
  }

  return res.json();
}

//Geolocation API - for location based Weather
export async function getCurrentWeatherByCoords(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Unable to fetch location weather");
  }

  return res.json();
}

export async function getForecastByCoords(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Unable to fetch location forecast");
  }

  return res.json();
}

// export async function getCurrentWeather(city) {
//   try {
//     const res = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: city,
//         units: "metric",
//         appid: API_KEY,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     if (err.response) {
//       throw new Error("City not found");
//     } else {
//       throw new Error("Failed to fetch weather");
//     }
//   }
// }

// export async function getForecast(city){
//   try{
//     const res = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: city,
//         units: "metric",
//         appid: API_KEY,
//       },
//     })
//   } catch (err) {
//     if (err.response) {
//       throw new Error("Forecast not available");
//     } else {
//       throw new Error("Failed to fetch Forecast");
//     }
//   }
// }
