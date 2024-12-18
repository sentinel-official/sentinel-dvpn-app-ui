const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CODE_PATH } = require("./paths");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");

const REACT_APP_APPLE_PAY_KEY = "appl_JaQzcXjXjbOZunQSRBXPYwwwECS";
const REACT_APP_ANDROID_KEY = "goog_GhVCmDsDZszdauzUUxgsEwzHMvQ";

const plugins = [
  new CopyWebpackPlugin({
    patterns: [{ from: "code/robots.txt", to: "." }],
  }),
  new MiniCssExtractPlugin({
    linkType: "text/css",
    filename: (pathData) => {
      const hash = pathData.chunk.hash;
      return `src/css/${hash}.css`;
    },
    chunkFilename: (pathData) => {
      const hash = pathData.chunk.hash;
      return `src/css/${hash}.css`;
    },
  }),
];

const getPlugins = (isProduction, mode) => {
  if (isProduction) {
    plugins.push(
      new GenerateSW({
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        sourcemap: false,
        disableDevLogs: true,
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 50,
        swDest: "service-worker.js",
        exclude: [/^\/api\//],
        include: [/\.(png|jpg|jpeg|gif|svg|ico|woff2|woff|html|js|css)$/],
        runtimeCaching: [
          {
            urlPattern: /\.(html)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "html",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "css",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(js)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "js",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(json)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "json",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(woff2|woff)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(png|jpg|jpeg|gif|svg|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/flagcdn\.com\/.*\.svg$/,
            handler: "CacheFirst",
            options: {
              cacheName: "flags",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      })
    );
  } else {
    plugins.push(
      new HtmlWebpackPlugin({
        title: "Sentinel Shield DVPN",
        template: `${CODE_PATH}/index.html`,
        minify: true,
        hash: false,
        cache: true,
        hot: true,
        favicon: `${CODE_PATH}/src/assets/favicon.ico`,
      })
    );
  }

  plugins.push(
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || mode),
      "process.env.REACT_APP_DEV_MODE": JSON.stringify(
        process.env.REACT_APP_DEV_MODE || isProduction ? false : true
      ),
      "process.env.X_KEY": JSON.stringify(
        process.env.X_KEY || "SnLnkORrZuzYsEPb"
      ),
      "process.env.REACT_APP_APPLE_PAY_KEY": JSON.stringify(
        process.env.REACT_APP_APPLE_PAY_KEY || REACT_APP_APPLE_PAY_KEY
      ),
      "process.env.REACT_APP_ANDROID_KEY": JSON.stringify(
        process.env.REACT_APP_ANDROID_KEY || REACT_APP_ANDROID_KEY
      ),
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.gif$/,
          attributes: { as: "image" },
        },
        {
          match: /.*\.png$/,
          attributes: { as: "image" },
        },
        {
          match: /.*\.svg$/,
          attributes: { as: "image" },
        },
        {
          match: /.*\.js$/,
          attributes: { as: "script" },
        },
        {
          match: /.*\.css$/,
          attributes: { as: "style" },
        },
        {
          match: /.*\.json$/,
          attributes: { as: "fetch", crossorigin: "anonymous" },
        },
        {
          match: /.*\.woff2$/,
          attributes: { as: "font", type: "font/woff2", crossorigin: true },
        },
      ],
    })
  );

  return plugins;
};

module.exports = getPlugins;
