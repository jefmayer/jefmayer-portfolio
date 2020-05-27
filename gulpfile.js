// Gulpfile
const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const replace = require('replace-in-file');
const stylelint = require('stylelint');
const browserSync = require('browser-sync');
const { buildJs, buildSass, lintJs, testJs } = require('./config/task-util');
const config = require('./config/project-config');
const webpackConfig = require('./config/webpack.config');

browserSync.create();

const {
  mainJs,
} = config.paths.js;

const {
  mainSass,
} = config.paths.sass;

const buildJsTask = (taskName, fileName) => {
  gulp.task(taskName, async () => {
    const {
      build,
      dest,
      filename,
      files,
      tests,
      version,
      watch,
    } = fileName;
  
    const linterResults = await lintJs(watch).catch(error => console.log(error));
    const testResults = await testJs(tests).catch(error => console.log(error));
  
    if (linterResults.success && testResults.success) {
      const buildResults = await buildJs(fileName, webpackConfig).catch(error => console.log(error));
      const changedFiles = await replace({
        files,
        from: `${filename}${/\.v([\d.-]+)\.min\.js(\?cache=([\d]+)|)/g}`,
        to: `${filename}.v${version}-${build}.min.js?cache=${new Date().getTime()}`,
      }).catch(error => console.log(error));
      console.log('Modified Files:', changedFiles.join(','));
      console.log(`${buildResults.stats.toString({ colors: true })}\n`);
      browserSync.reload(`${filename}.v${version}-${build}.min.js`);
      console.log('\n');
    } else {
      console.log(linterResults.formatted);
      console.log(linterResults ? '' : `Linter Failed, ${filename}.v${version}-${build}.min.js was not built`);
      console.log(testResults.success ? '' : `Tests Failed, ${filename}.v${version}-${build}.min.js was not built`);
    }
  });
};

const buildCssTask = (taskName, fileName) => {
  gulp.task(taskName, async () => {
    const {
      build,
      dest,
      filename,
      files,
      version,
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
        from: `${filename}${/\.v([\d.-]+)\.min\.css(\?cache=([\d]+)|)/g}`,
        to: `${filename}.v${version}-${build}.min.css?cache=${new Date().getTime()}`,
      }).catch(error => console.log(error));
      console.log('Modified Files:', changedFiles.join(','));
      console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.v${version}-${build}.min.css`)));
      console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.v${version}-${build}.min.css.map`)));
      browserSync.reload(`${filename}.v${version}-${build}.min.css`);
      console.log('\n');
    } else {
      console.log(`There are CSS errors. Stylesheet did NOT build! Please fix your CSS errors. ${new Date().toLocaleTimeString()}`);
    }
  });
};

buildJsTask('buildMainJs', mainJs);
buildCssTask('buildMainCss', mainSass);

gulp.task('watch', ['default'], () => {
  browserSync.init({
    server: './',
    logLevel: 'debug',
    online: true,
    open: false,
    port: 8080,
    ui: false,
  });
});

gulp.task('default', () => {
  gulp.watch(mainJs.watch, ['buildMainJs']);
  gulp.watch(mainSass.watch, ['buildMainCss']);
});

module.exports = gulp;
