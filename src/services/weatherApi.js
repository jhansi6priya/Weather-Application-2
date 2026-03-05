const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_URL;
const G_URL = import.meta.env.VITE_G_URL;

//API to fetch weather details using city
export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`,
  );

  console.log(res);

  if (!res.ok) {
    throw new Error(
      "Location not found, Please check the spelling and try again.",
    );
  }

  return res.json();
}

//API to fetch the weather details using city
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

//API for suggestions to appear in the search bar
export async function getCitySuggestions(query) {
  const res = await fetch(
    `${G_URL}/direct?q=${query}&limit=10&appid=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch city suggestions");
  }

  return res.json();
}

//AXIOS
// export async function getCurrentWeather(city){
//   try{
//     const res = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: city, 
//         units: metric,
//         appid: API_KEY
//       }
//     });
//     return res.data;
//   }catch(error){
//     if(error.response){
//       throw new Error("AXIOS error");
//     }
//   }
// }