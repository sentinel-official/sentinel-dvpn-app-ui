const getPlugins = require("./plugins");
const createWebpackConfig = require("./webpack.common");

const config = () => {
  const mode = "development";
  const plugins = getPlugins(false, mode);

  const proxy = [
    {
      context: ["/api"],
      target: "http://127.0.0.1:3876",
      headers: {
        "Content-type": "application/json",
        "x-key": "SnLnkORrZuzYsEPb",
      },
      timeout: 30000,
    },
  ];

  const devServer = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    compress: true,
    port: 3000,
    client: {
      logging: "info",
    },
    hot: true,
    historyApiFallback: true,
    proxy,
  };

  return createWebpackConfig({ devServer, mode, plugins });
};

module.exports = config;
