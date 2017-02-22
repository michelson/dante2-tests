var path = require('path');
var webpack = require('webpack');


var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: {
    // resolve the path for react, (npm link issues load react twice)
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  module: {
    loaders: [
      {
        test: /(\.jsx?|\.js|\.es6)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', "stage-2"],
          plugins: ["transform-react-jsx"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader:'file-loader?limit=1024&name=images/[name].[ext]'
      }

    ]
  },

/*
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
*/
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin("styles.css"),
  ]
};

