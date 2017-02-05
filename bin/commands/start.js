'use strict';

const path = require('path');
const chalk = require('chalk');
const log = require('../util/log');
const exec = require('child_process').exec;


module.exports = function(options) {
  log(
    chalk.grey(`Starting the API webserver on port ${options.port}`),
    options,
    options
  );

  const jsonOptions = JSON.stringify(options);
  const serverPath = path.join(__dirname, '..', '..', 'index.js');

  const server = exec(`node ${serverPath} '${jsonOptions}'`);
  server.stdout.pipe(process.stdout);
};
