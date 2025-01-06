const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    ...defaultConfig,
    webpack: (config) => {
      if (process.env.APP_ENV === 'local' || phase === PHASE_DEVELOPMENT_SERVER) {
        Object.defineProperty(config, 'devtool', {
          get() {
              return 'source-map';
          },
          set() {}
      });
      }
      return config;
    }
  };

  if (phase !== PHASE_DEVELOPMENT_SERVER && process.env.APP_ENV !== 'local') {
    return { ...nextConfig, distDir: 'dist' };
  }
  return nextConfig;
};