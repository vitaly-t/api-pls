'use strict';

// These are functions that return the "base" queries to be passed into
// pg-promise. The CRUD methods of the Controller will use these, though they
// may eventually also author their own extensions or replacements.

exports.create = function({tableName, attrs, db}) {
  const baseQuery = db.$config.pgp.helpers.insert(attrs, null, tableName);
  return `${baseQuery} RETURNING *`;
};

// `fields` are the columns to return. You can pass in an array, such as
// ['first_name', 'last_name'],
// or an asterisk to get everything: '*'.
// By default, the asterisk is used.
exports.read = function({tableName, fields, db, id}) {
  const pgp = db.$config.pgp;

  // Default fields to an asterisk
  fields = fields ? fields : '*';
  var columns = pgp.as.name(fields);

  const baseQuery = pgp.as.format(`SELECT ${columns} FROM $[tableName~]`, {
    tableName
  });

  let endQuery;
  if (id) {
    endQuery = pgp.as.format('WHERE id = $[id]', {id});
  }

  return `${baseQuery} ${endQuery}`;
};

exports.update = function({tableName, attrs, id, db}) {
  const pgp = db.$config.pgp;
  const baseQuery = pgp.helpers.update(attrs, null, tableName);
  const endQuery = pgp.as.format('WHERE id=$[id] RETURNING *', {id});
  return `${baseQuery} ${endQuery}`;
};

exports.delete = function({tableName, id, db}) {
  const pgp = db.$config.pgp;
  return pgp.as.format('DELETE FROM $[tableName~] WHERE id=$[id] RETURNING *', {
    tableName, id
  });
};
