const optimization = require("./optimization");
const { DIST_PATH, CODE_PATH } = require("./paths");
const rules = require("./rules");

const createWebpackConfig = ({ devServer, mode, plugins }) => {
  const performance = {
    hints: false,
  };
  const target = "web";
  const extensions = [".js", ".jsx", ".mjs", ".cjs"];
  const resolve = {
    extensions,
    alias: {
      "@components": `${CODE_PATH}/src/components/`,
      "@containers": `${CODE_PATH}/src/containers/`,
      "@private": `${CODE_PATH}/src/screens/private/`,
      "@public": `${CODE_PATH}/src/screens/public/`,
      "@store": `${CODE_PATH}/src/redux/store.js`,
      "@actions": `${CODE_PATH}/src/redux/actions/`,
      "@reducers": `${CODE_PATH}/src/redux/reducers/`,
      "@services": `${CODE_PATH}/src/services/`,
      "@layouts": `${CODE_PATH}/src/layouts/`,
      "@helpers": `${CODE_PATH}/src/helpers/`,
      "@hooks": `${CODE_PATH}/src/hooks/`,
      "@navigation": `${CODE_PATH}/src/navigation/`,
      "@pngs": `${CODE_PATH}/src/assets/pngs/`,
      "@svgs": `${CODE_PATH}/src/assets/svgs/`,
      "@gifs": `${CODE_PATH}/src/assets/gifs/`,
      "@root": `${CODE_PATH}/src/`,
    },
  };
  const entry = {
    index: `${CODE_PATH}/index.js`,
  };

  const output = {
    path: DIST_PATH,
    publicPath: "/",
    filename: (pathData) => {
      const name = pathData.chunk.name || pathData.chunk.id;

      if (name === "index") {
        return `${name}.js`;
      }
      return `src/js/packages/${name}.js`;
    },
    chunkFilename: (pathData) => {
      const name = pathData.chunk.hash || pathData.chunk.id;
      return `src/js/chunks/${name}.js`;
    },
    clean: true,
    libraryTarget: "umd",
  };
  const module = { rules };

  return {
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
    mode,
    entry,
    output,
    devServer,
    performance,
    target,
    plugins,
    resolve,
    optimization,
    module,
  };
};

module.exports = createWebpackConfig;
