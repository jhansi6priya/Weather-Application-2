import { useEffect, useRef } from "react";

const useSpotlightEffect = (config = {}) => {
  const {
    spotlightSize = 300,
    fadeSpeed = 0.08,
    glowColor = "255, 190, 100", 
    pulseSpeed = 1000,
  } = config;

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const spotlightPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lerp = (start, end, factor) =>
      start + (end - start) * factor;

    const handleMouseMove = (e) => {
      targetPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      );

      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      );

      // Gentle breathing pulse
      const pulseScale =
        1 + 0.08 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);

      const currentSize = spotlightSize * pulseScale;

      const x = spotlightPos.current.x;
      const y = spotlightPos.current.y;

      // ☀️ MAIN SUN CORE
      const sunGradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        currentSize
      );

      sunGradient.addColorStop(0, `rgba(${glowColor}, 0.9)`);
      sunGradient.addColorStop(0.3, `rgba(${glowColor}, 0.6)`);
      sunGradient.addColorStop(0.6, `rgba(${glowColor}, 0.3)`);
      sunGradient.addColorStop(1, "rgba(255, 200, 120, 0)");

      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(x, y, currentSize, 0, Math.PI * 2);
      ctx.fill();

      // 🌤️ OUTER ATMOSPHERIC GLOW
      const haloGradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        currentSize * 1.8
      );

      haloGradient.addColorStop(0, `rgba(${glowColor}, 0.25)`);
      haloGradient.addColorStop(1, "rgba(255, 200, 120, 0)");

      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(x, y, currentSize * 1.8, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spotlightSize, fadeSpeed, glowColor, pulseSpeed]);

  return canvasRef;
};

export default useSpotlightEffect;
