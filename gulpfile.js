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
  js,
  sass,
  server,
} = config.paths;

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
      console.log(linterResults ? '' : `Linter Failed, ${filename}.min.js was not built.  ${new Date().toLocaleTimeString()}`);
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
      console.log(`Linter Failed, ${filename}.min.css was not built. ${new Date().toLocaleTimeString()}`);
    }
  });
};

Object.keys(js).forEach((key) => {
  buildJsTask(`${js[key].filename}.min.js`, js[key], webpackConfig[js[key].webpackConfig]);
});

Object.keys(sass).forEach((key) => {
  buildCssTask(`${sass[key].filename}.min.css`, sass[key]);
});

const watch = () => {
  Object.keys(js).forEach((key) => {
    gulp.watch(js[key].watch, gulp.series(`${js[key].filename}.min.js`));
  });
  Object.keys(sass).forEach((key) => {
    gulp.watch(sass[key].watch, gulp.series(`${sass[key].filename}.min.css`));
  });
};

browserSync.init({
  files: server.watch,
  server: './',
  logLevel: 'debug',
  online: true,
  open: false,
  port: 8080,
  ui: false,
});

exports.watch = watch;
