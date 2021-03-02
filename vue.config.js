const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.ts`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const plugins =
  process.env.NODE_ENV === "production"
    ? [
        {
          from: path.resolve("src/manifest.production.json"),
          to: `${path.resolve("dist")}/manifest.json`
        }
      ]
    : [
        {
          from: path.resolve("src/manifest.development.json"),
          to: `${path.resolve("dist")}/manifest.json`
        }
      ];

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [CopyWebpackPlugin(plugins)]
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 9527,
    https: false,
    hotOnly: false,
    proxy: {
      "/bingImg": {
        target: "https://cn.bing.com",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/bingImg": "",
        }
      }
    }
  }
};
