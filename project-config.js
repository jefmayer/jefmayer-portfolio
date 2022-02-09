module.exports = {
  paths: {
    sass: {
      mainSass: {
        file: './src/scss/main.scss',
        outputStyle: 'compressed',
        sourceMap: true,
        watch: ['./src/scss/main.scss', './src/scss/**/*.scss'],
        dest: 'build/css',
        filename: 'main',
        files: [],
      },
    },
    js: {
      mainJs: {
        source: './src/js/main.js',
        watch: ['./src/js/main.js', './src/js/modules/**/*.js'],
        dest: 'build/js',
        filename: 'main',
        files: [],
      },
    },
  },
};
