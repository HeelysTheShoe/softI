const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: path.resolve(__dirname, "./client/index.js"),
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            //@babel/preset-env is a Babel preset that allows you to use the latest JavaScript features, including those from ECMAScript, without needing to specify each feature individually. It automatically determines the necessary Babel plugins based on the version of JavaScript specified in your project's .babelrc file and the current environment.
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  // sets up server that keeps track of changes and instantly bundles
  devServer: {
    host: "localhost",
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "./build"),
      publicPath: "/",
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  resolve: {
    // check if css can be included here
    extensions: [".js", ".jsx"],
  },
};
