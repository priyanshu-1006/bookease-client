import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

const StarsBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-stars"
      init={particlesInit}
      options={{
        preset: 'stars',
        background: {
          color: '#0d1b2a', // Night sky
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
      }}
    />
  );
};

export default StarsBackground;
