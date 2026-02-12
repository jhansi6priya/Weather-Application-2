import { Outlet } from "react-router-dom";
import useSpotlightEffect from "../hooks/useSpotlightEffect";

export default function Layout() {
  const canvasRef = useSpotlightEffect({
    spotlightSize: 30,
    glowColor: "255, 190, 100",
    fadeSpeed: 0.09,
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className="spotlight-canvas"
      />
      <Outlet />
    </>
  );
}
