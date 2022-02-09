module.exports = {
  default: {
    entry: {
      src: '',
    },
    output: {
      filename: '',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'minify'],
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    mode: 'production',
    stats: {
      colors: true,
    },
    devtool: 'source-map',
  },
};
