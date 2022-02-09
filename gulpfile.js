const gulp = require('gulp');
const path = require('path');
const replace = require('replace-in-file');
const stylelint = require('stylelint');
const browserSync = require('browser-sync');
const { buildJs, buildSass, lintJs } = require('./task-util');
const config = require('./project-config');
const webpackConfig = require('./webpack.config');

browserSync.create();

const {
  mainJs,
} = config.paths.js;

const {
  mainSass,
} = config.paths.sass;

const buildJsTask = (taskName, fileName, configFile) => {
  gulp.task(taskName, async () => {
    const {
      filename,
      files,
      watch,
    } = fileName;
    const linterResults = await lintJs(watch).catch(error => console.log(error));
    if (linterResults.success) {
      const buildResults = await buildJs(fileName, configFile).catch(error => console.log(error));
      const changedFiles = await replace({
        files,
        from: `${filename}${/.min\.js(\?cache=([\d]+)|)/g}`,
        to: `${filename}.min.js?cache=${new Date().getTime()}`,
      }).catch(error => console.log(error));
      console.log('Modified Files:', changedFiles.join(','));
      console.log(`${buildResults.stats.toString({ colors: true })}\n`);
      console.log('\n');
    } else {
      console.log(linterResults.formatted);
      console.log(linterResults ? '' : `Linter Failed, ${filename}.min.js was not built`);
    }
  });
};

const buildCssTask = (taskName, fileName) => {
  gulp.task(taskName, async () => {
    const {
      dest,
      filename,
      files,
      watch,
    } = fileName;
  
    const linterResults = await stylelint.lint({
      cache: true,
      configFile: '.stylelintrc.json',
      files: watch,
      formatter: 'verbose',
      syntax: 'scss',
    }).catch(error => console.log(error));
    console.log(linterResults.output);
    if (!linterResults.errored) {
      fileName.outFile = `${dest}/${filename}.min.css`;
      await buildSass(fileName).catch(error => console.log(error));
      const changedFiles = await replace({
        files,
        from: `${filename}${/.min\.css(\?cache=([\d]+)|)/g}`,
        to: `${filename}.min.css?cache=${new Date().getTime()}`,
      }).catch(error => console.log(error));
      console.log('Modified Files:', changedFiles.join(','));
      console.log(path.join(__dirname, `${dest}/${filename}.min.css`));
      console.log(path.join(__dirname, `${dest}/${filename}.min.css.map`));
      console.log('\n');
    } else {
      console.log(`There are CSS errors. Stylesheet did NOT build! Please fix your CSS errors. ${new Date().toLocaleTimeString()}`);
    }
  });
};

buildJsTask('buildMainJs', mainJs, webpackConfig.default);
buildCssTask('buildMainCss', mainSass);

gulp.task('default', () => {
  gulp.watch(mainJs.watch, gulp.series('buildMainJs'));
  gulp.watch(mainSass.watch, gulp.series('buildMainCss'));
  browserSync.init({
    server: './',
    logLevel: 'debug',
    online: true,
    open: false,
    port: 8080,
    ui: false,
  });
});

module.exports = gulp;
