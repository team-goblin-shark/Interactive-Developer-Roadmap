const path = require('path');

module.exports = env => ({
  mode: process.env.NODE_ENV || 'development',
  entry: './client/index.js',
  output: {
    publicPath: path.resolve(__dirname, '/dist/'),
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: path.resolve(__dirname, '/dist/'),
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

});
