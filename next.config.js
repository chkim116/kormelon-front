const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  target: 'experimental-serverless-trace',
  compress: true,
  webpack(config, { isServer }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    if (isServer) {
      require('./scripts/sitemap.js');
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
      plugins,
      module: {
        ...config.module,
        rules: [...config.module.rules, {}],
      },
    };
  },
});
