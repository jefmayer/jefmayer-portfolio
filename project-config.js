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
      scrollMagicJs: {
        source: './node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
        watch: ['./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'],
        dest: './node_modules/scrollmagic/scrollmagic/minified',
        filename: 'ScrollMagic',
        files: [],
      },
    },
  },
};
