const path = require('path')
module.exports = {
    entry: './src/Scroll.ts',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, './build'),
      filename: "Scroll.js"
    },
  module: {
      rules: [{
        test: /\.ts/,
        loader: 'ts-loader',
      }]
  }
}