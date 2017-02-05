'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const loadResourceModels = require('api-pls-util/load-resource-models');
const buildMigrations = require('api-pls-util/build-migrations');
const deleteMigrations = require('../util/delete-migrations');

module.exports = function(options) {
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

      console.log(chalk.grey('Deleting old migrations...'));

      deleteMigrations()
        .then(function() {
          console.log(chalk.green('✔ Existing migrations successfully deleted.'));
          console.log(chalk.grey('Building migrations...'));

          const migrationsDir = options.migrationsDirectory;
          const resourcesDir = options.resourcesDirectory;
          const resources = loadResourceModels(resourcesDir);

          // Write the migrations out so that Careen can read them. This is temporary:
          // eventually, we need to store these in the database.
          resources.forEach(resource => {
            const migration = buildMigrations(resource);
            const timeBasedId = new Date()
              .valueOf()
              .toString(36);
            const filename = `${timeBasedId}.${resource.name}.sql`;
            const migrationPath = path.join(migrationsDir, filename);
            fs.writeFileSync(migrationPath, migration);
          });

          console.log(chalk.green('✔ Migrations successfully built.'));
          console.log(chalk.grey('Running migrations...'));

          const migrate = require('../../database/migrate');
          migrate.up();

          console.log(chalk.green('✔ Migrations successfully run. The database is up to date.'));
        });
    });
};
