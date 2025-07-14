import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const StarsBackground = () => {
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
          color: '#000000', // you can change this to match your theme
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
