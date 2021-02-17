const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(__dirname, 'dist'),
    host: '127.0.0.1',
    hot: true,
  },
  entry: './index.js',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      filename: "result.html",
      template: './result.html'
    }),
    new CleanWebpackPlugin(),
  ],
};
