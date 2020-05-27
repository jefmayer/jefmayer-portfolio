// Task Functions for Task Runner
const path = require('path');
const fs = require('fs');
const { CLIEngine } = require('eslint');
const Mocha = require('mocha');
const webpack = require('webpack');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const buildJs = ({ source, dest, filename, version, build }, webpackConfig) => new Promise((resolve, reject) => {
  webpack(Object.assign({}, webpackConfig, {
    entry: {
      source,
    },
    output: {
      path: path.resolve(dest),
      filename: `${filename}${webpackConfig.output.filename}.v${version}-${build}.min.js`,
    },
  }), (err, stats) => {
    if (err) {
      reject(new Error(`Error building Javascript: ${err}`));
    }
    resolve({
      stats,
    });
  });
});

const lintJs = src => new Promise((resolve, reject) => {
  try {
    const eslint = new CLIEngine({
      cache: true,
      useEslintrc: true,
    });
    const report = eslint.executeOnFiles(src);
    const formatter = eslint.getFormatter();
    resolve({
      report,
      success: report.errorCount === 0 || false,
      formatted: formatter(report.results),
    });
  } catch (reason) {
    reject(new Error(`Linting error: ${reason}`));
  }
});

const testJs = src => new Promise((resolve, reject) => {
  try {
    const mocha = new Mocha();
    [...src].map((file) => {
      delete require.cache[path.resolve(file)];
      return mocha.addFile(file);
    });
    mocha.run(failures => resolve({ success: failures === 0 || false }));
  } catch (reason) {
    reject(new Error(`Tests failed: ${reason}`));
  }
});

const buildSass = ({ file, includePaths, outputStyle, sourceMap, outFile }) => new Promise((resolve, reject) => {
  sass.render({
    file,
    includePaths,
    outFile,
    outputStyle,
    sourceMap,
  }, async (err, result) => {
    if (err) {
      reject(new Error(`Error building bundleSass: ${err}`));
    }
    const postCssResult = await postcss([autoprefixer]).process(result.css.toString(), {
      from: file,
      to: outFile,
      map: {
        inline: false,
        prev: result.map.toString(),
      },
    }).catch(postCssErr => reject(new Error(`Error with postcss: ${postCssErr}`)));
    fs.writeFileSync(outFile, postCssResult.css.toString());
    fs.writeFileSync(`${outFile}.map`, postCssResult.map.toString());
    resolve(postCssResult);
  });
});

module.exports = {
  buildJs,
  lintJs,
  testJs,
  buildSass,
};
