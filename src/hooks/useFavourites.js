import {useState, useEffect} from "react";

export default function useFavourites(){
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem("favouriteCities");
        return saved ? JSON.parse(saved) : [];
    });//lazy intialization - runs only on first render, checks localStorage, if data exists - parse it, else start with empty array

    useEffect(() => {
        localStorage.setItem(
            "favouriteCities", 
            JSON.stringify(favourites)
        );
    }, [favourites]);//whenever the dependency favourites change, then the component re-renders , useEffect runs, updated list is saved to localStorage
    //You are NOT calling setFavourites() inside the effect.

    //You are just syncing to an external system (localStorage).

    //That is exactly what useEffect is meant for.

    const addFavourite = (city) => {
        if(!favourites.includes(city)) {
            setFavourites(prev => [...prev, city]);
        }
    };
    //Checks if city already exists
    //if not : creates a new arrray, updates state, Triggers re-render, useEffect saves updated list

    const removeFavourite = (city) => {
        setFavourites(prev => prev.filter(c => c !== city));
    };
    //removes city, update state, re-render, effect saves updated list

    return { favourites, addFavourite, removeFavourite};

}