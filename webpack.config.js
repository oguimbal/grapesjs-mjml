const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const name = pkg.name;
let plugins = [];

module.exports = (env = {}) => {
  const isProd = !!env.production;
  const isDev = !!env.development;
  const output = {
      path: path.join(__dirname),
      filename: `./dist/${name}.min.js`,
      library: name,
      libraryTarget: 'umd',
  };
  if (isProd) {
    plugins = [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ]
  } else if(isDev) {
    output.filename = `./dist/${name}.js`;
  } else {
    const index = 'index.html';
    const indexDev = '_' + index;
    plugins.push(new HtmlWebpackPlugin({
      template: fs.existsSync(indexDev) ? indexDev : index
    }));
  }

  return {
    entry: './src',
    output: output,
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : false,
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
      }],
    },
    externals: { 'grapesjs': 'grapesjs' },
    plugins: plugins,
  };
}
