const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    ...defaultConfig,
    webpack: (config) => {
      if (process.env.NODE_V8_COVERAGE) {
        console.log(`${process.env.NODE_V8_COVERAGE} is enabled`);
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

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    return { ...nextConfig, distDir: 'dist' };
  }
  return nextConfig;
};