const path = require("path");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
    publicPath: "/",
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
