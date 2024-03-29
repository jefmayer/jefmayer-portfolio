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
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }],
                  ['minify', {
                    builtIns: false,
                    evaluate: false,
                    mangle: false,
                  }],
                ],
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
