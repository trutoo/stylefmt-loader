"use strict";

const stylefmt = require('stylefmt');
const postcss = require('postcss');
const scss = require('postcss-scss');
const sorting = require('postcss-sorting');
const loaderUtils = require("loader-utils");

const fs = require('fs');

module.exports = function (source) {
  let callback = this.async();
  let resourcePath = this.resourcePath;
  let query = loaderUtils.parseQuery(this.query);

  let stylefmtConf = stylefmt(query.stylefmtConfig ? {
    configFile: `${process.cwd()}/${query.config}`
  } : undefined);

  let sortingConf = sorting(query.sortingConfig ?
    require(`${process.cwd()}/${query.config}`) : {});

  postcss([
    stylefmtConf,
    sortingConf,
  ])
    .process(source, { syntax: scss })
    .then(function (result) {
      if (source !== result.css) {
        fs.writeFileSync(resourcePath, result.css);
      }
      callback(null, result.css);
    }).catch((e) => {
      throw new Error(e);
    });

};
