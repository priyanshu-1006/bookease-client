import React from 'react';
import Particles from 'react-tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';
import { useCallback } from 'react';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'links',
        background: {
          color: '#0d47a1',
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
      }}
    />
  );
};

export default ParticlesBackground;
