"use strict";

/**
 * webpack build config
 */
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");
var CONFIG = require("./config");
var utils = require("./utils");

var baseConfig = {
  mode: "production",
  entry: utils.resolve("src/index"),
  output: {
    filename: "codeHighlight.js",
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
      chunkFilename: "theme/css/[name].css",
      filename: "theme/css/[name].css"
    }),
  ]
};

module.exports = baseConfig;
