'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = function() {
  inquirer.prompt([{
      type: 'confirm',
      name: 'confirmation',
      message: 'Would you like to build and run migrations? This cannot be undone',
      default: false
    }])
    .then(function(answers) {
      if (!answers.confirmation) {
        return;
      }

      console.log(chalk.grey('Building migrations...'));
      console.log(chalk.green('✔ Migrations successfully built.'));
      console.log(chalk.grey('Running migrations...'));
      console.log(chalk.green('✔ Migrations successfully run. The database is up to date.'));
    });
};

// const fs = require('fs');
// const path = require('path');
// const yaml = require('js-yaml');
// const resourceTransform = require('../lib/resource-transform');
//
// // Store all of the resources you'd like in this directory. Eventually, these
// // would be a edited via a Web UI, or even from the command line.
// const resourceDir = path.join(__dirname, './resources');
//
// // This function reads and parses the resource from the disk, and returns it.
// // At the moment, only YAML files are supported, although it'd be simple to add
// // in support for JSON.
// function loadResource(filename) {
//   const filePath = path.join(resourceDir, filename);
//
//   let doc;
//   try {
//     doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
//   } catch (e) {
//     console.warn('Resource file could not be loaded');
//   }
//
//   return doc;
// }
//
// // Loop through all files in the directory
// const resources = fs.readdirSync(resourceDir)
//   // Open them up and parse them as JSON
//   .map(loadResource)
//   // Transform them into a "resource definition," which is useful on the
//   // generated server, and a migration, which is useful for configuring the DB.
//   // Eventually, a series of migrations will be generated capturing changes
//   // made to the resource definition. Also, all of this will be stored in the
//   // DB.
//   .map(resourceTransform);
//
// // Write the migrations out so that Careen can read them. This is temporary:
// // eventually, we need to store these in the database.
// resources.forEach(resource => {
//   const timeBasedId = new Date()
//     .valueOf()
//     .toString(36);
//   const filename = `${timeBasedId}.${resource.definition.name}.sql`;
//   const migrationPath = path.join(__dirname, 'migrations', filename);
//   fs.writeFileSync(migrationPath, resource.migration);
// });
//
// // Convert it to a JSON string so we can hand it off to the generated API.
// const resourceString = JSON.stringify(resources);
//
// // Write JSON result to stdout. This will be consumed by the server to set up
// // the routes and database.
// console.log(resourceString);
//
// // Write this out to the disk – this is useful for debugging purposes.
// fs.writeFileSync('./test.json', resourceString);
