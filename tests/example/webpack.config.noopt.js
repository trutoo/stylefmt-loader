module.exports = {
  entry: "./test.js",
  output: {
    filename: "output.js"
  },
  module: {
    loaders: [
      {test: /\.scss$/, loader: "css-loader!sass-loader!stylefmt-loader"}
    ]
  }
};