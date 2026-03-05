/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "../services/weatherApi";

export default function SearchBar({ onSearch, onLocate }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [locating, setLocating] = useState(false);

  const wrapperRef = useRef(null);
  const isSelectingRef = useRef(false);

  /* ========================
     FETCH SUGGESTIONS (DEBOUNCE)
  ======================== */
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await getCitySuggestions(value);
        setSuggestions(data);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  /* ========================
     CLOSE SUGGESTIONS ON OUTSIDE CLICK
  ======================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ========================
     SUBMIT SEARCH
  ======================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    onSearch(value.trim());
    setSuggestions([]);
    setActiveIndex(-1);
  };

  /* ========================
     SELECT CITY
  ======================== */
  const handleSelect = (selectedCity) => {
    isSelectingRef.current = true;

    const fullName = `${selectedCity.name}, ${selectedCity.country}`;

    setValue(fullName);
    setSuggestions([]);
    setActiveIndex(-1);

    onSearch(fullName);
  };

  /* ========================
     KEYBOARD NAVIGATION
  ======================== */
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }

    if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const handleLocation = () => {
    setLocating(true);

    onLocate(); // call parent function

    setTimeout(() => {
      setLocating(false);
    }, 1500);
  };

  return (
    <div ref={wrapperRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="input-bar">
          <input
            type="text"
            placeholder="Search city..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="search-wrapper">
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className={`suggestion-item ${
                      i === activeIndex ? "active" : ""
                    }`}
                    onClick={() => handleSelect(s)}
                  >
                    {s.name}
                    {s.state ? `, ${s.state}` : ""}, {s.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="search-btn">
            <img src="/src/assets/loupe.png" alt="search" />
          </button>
        </div>

        {/* GEOLOCATION BUTTON */}
        <button
          type="button"
          className="location-btn"
          onClick={handleLocation}
          disabled={locating}
        >
          {locating ? (
            <span className="mini-spinner"></span>
          ) : (
            <img src="/src/assets/geo.png" alt="location" />
          )}
        </button>
      </form>
    </div>
  );
}
