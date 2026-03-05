import { createContext, useContext, useState } from "react";
import useWeather from "../hooks/useWeather";

const WeatherContext = createContext();

export function WeatherProvider({ children }){
    const [city, setCity] = useState();

    const weather = useWeather(city);

    return(
        <WeatherContext.Provider value={{city, setCity, ...weather}}>
            {children}
        </WeatherContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeatherContext() {
    return useContext(WeatherContext);
}