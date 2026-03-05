import { Outlet } from "react-router-dom";
import useSpotlightEffect from "../hooks/useSpotlightEffect";
import Navbar from "../components/Navbar";

export default function Layout() {
  const canvasRef = useSpotlightEffect({
    spotlightSize: 30,
    glowColor: "255, 190, 100",
    fadeSpeed: 0.09,
  });

  return (
    <>
      <Navbar />
      <canvas
        ref={canvasRef}
        className="spotlight-canvas"
      />
      <Outlet />
    </>
  );
}
