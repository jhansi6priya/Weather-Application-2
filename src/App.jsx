import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Details from "./pages/Details";
import Layout from "./layout/Layout";

import "./App.css";
import "./styles/SearchBar.css";
import "./styles/CurrentWeather.css";
import "./styles/ForecastCard.css";
import "./styles/HighlightCard.css";
import "./styles/AboutPage.css";
import "./styles/DetailPage.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />} />
      </Route>
    </Routes>
  );
}
