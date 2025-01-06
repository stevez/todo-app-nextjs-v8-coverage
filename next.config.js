const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    ...defaultConfig,
    webpack: (config) => {
      if (process.env.NODE_V8_COVERAGE) {
       config.devtool = 'source-map';
       config.optimization.minimize = false;
      }
      return config;
    }
  };

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    return { ...nextConfig, distDir: 'dist' };
  }
  return nextConfig;
};