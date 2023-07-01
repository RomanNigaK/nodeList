const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    assetModuleFilename: "assets/[name][ext]",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "dist"),
    // },
    proxy: {
      "/api": {
        target: "http://localhost:7070",
        router: () => "http://localhost:5000",
        logLevel: "debug" /*optional*/,
      },
    },
    port: 7070,
    // hot: true,
    // historyApiFallback: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    extensions: [".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./public/ico.ico",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.(css|scss)$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.(svg)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "icons/[hash][ext]",
        },
      },
    ],
  },

  mode: "development",
};
