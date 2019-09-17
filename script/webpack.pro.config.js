"use strict";

/**
 * webpack build config
 */
var path = require("path");
var fs = require("fs");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");
var CONFIG = require("./config");
var utils = require("./utils");

// 主题路径
const THEME_PATH = './src/themes';
const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
const themeFileNameSet = fs.readdirSync(path.resolve(THEME_PATH));
const getThemeName = fileName => `theme-${path.basename(fileName, path.extname(fileName))}`;
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const cacheGroups = {};
const themeEnterSet = {};

themeFileNameSet.forEach(fileName => {
  const themeName = getThemeName(fileName);
  themeEnterSet[themeName] = resolveToThemeStaticPath(fileName);
  cacheGroups[themeName] = {
    name: themeName,
    test: (m, c, entry = themeName) => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
    chunks: 'all',
    enforce: true
  };
});

var baseConfig = {
  mode: "production",
  entry: {
    codeHighlight: utils.resolve("src/index"),
    ...themeEnterSet
  },
  output: {
    filename: "[name].js",
    path: CONFIG.buildPath,
    library: "codeHighlight",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  resolve: {
    modules: [
      utils.resolve("node_modules")
    ],
    extensions: [".js"],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader", // 缓存loader执行结果
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({ // css拆分
      chunkFilename: "theme/[name].css",
      filename: "theme/[name].css"
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: cacheGroups
    }
  }
};

module.exports = baseConfig;
