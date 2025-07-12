import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles-engine"; // ✅ Correct source

const AnimatedBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // loads all plugins
  }, []);

  return (
    <Particles
      id="tsparticles-stars"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#0d1b2a" },
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 1,
            random: true,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.3,
              sync: false,
            },
          },
          size: {
            value: { min: 0.5, max: 1.8 },
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: "none",
            outModes: { default: "bounce" },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default AnimatedBackground;
