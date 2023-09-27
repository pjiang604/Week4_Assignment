module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
}, {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**" //2 stars means any host name
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ]
  }
}
