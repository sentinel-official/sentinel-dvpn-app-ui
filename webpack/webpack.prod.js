const HtmlWebpackPlugin = require("html-webpack-plugin");
const createWebpackConfig = require("./webpack.common");
const { CODE_PATH } = require("./paths");
const getPlugins = require("./plugins");

const BUILD_TYPES = {
  website: "website",
  library: "library",
};

const config = (options) => {
  const { type } = options;
  const mode = "production";
  const plugins = getPlugins(true, mode);
  if (type === BUILD_TYPES.website) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: "Sentinel Shield DVPN",
        template: `${CODE_PATH}/index.html`,
        favicon: `${CODE_PATH}/src/assets/favicon.ico`,
        minify: true,
        hash: false,
        cache: true,
        hot: true,
      })
    );
  }

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
  };

  return createWebpackConfig({ devServer, mode, plugins });
};

module.exports = config;
