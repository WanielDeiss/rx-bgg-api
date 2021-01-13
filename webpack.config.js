const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      util: false,
      assert: false,
      https: false,
      http: false,
      crypto: false,
      stream: false,
      buffer: false,
      url: false,
      querystring: false,
      zlib: false,
      net: false,
      tls: false,
      fs: false,
      path: false
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
