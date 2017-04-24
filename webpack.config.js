module.exports = {
  entry: './client/index.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js.*$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
