// Project Config for Task Runner
module.exports = {
  paths: {
    sass: {
      mainSass: {
        file: './src/scss/main.scss',
        outputStyle: 'compressed',
        sourceMap: true,
        outFile: 'build/css/main.v1.0-1.min.css',
        watch: ['./src/scss/main.scss', './src/scss/**/*.scss'],
        dest: 'build/css',
        filename: 'main',
        version: '1.0',
        build: '1',
        files: ['build/index.html'],
      },
    },
    js: {
      watch: './src/js/**/*.js',
      mainJs: {
        source: [
          './src/js/modules/loader.js',
          './src/js/modules/scenes.js',
          './src/js/main.js',
        ],
        watch: ['./src/js/main.js', './src/js/modules/**/*.js'],
        dest: 'build/js',
        filename: 'main',
        version: '1.0',
        build: '1',
        files: ['build/index.html'],
        tests: '',
      },
    },
  },
};
