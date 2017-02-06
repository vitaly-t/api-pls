'use strict';

const _ = require('lodash');
const Graph = require('dependency-graph').DepGraph;

// Resources can have dependencies on one another, due to their relations. This
// module accepts an array of resource models, and will return a list of
// resource names in the correct order. This can then be used to migrate
// them in the correct order.
module.exports = function(resources) {
  const graph = new Graph();

  // First, add all of the nodes to the graph.
  _.forEach(resources, r => graph.addNode(r.name));

  // Then, loop through to get set their dependencies.
  _.forEach(resources, resource => {
    const relations = _.chain(resource.relations)
      .map(relation => relation.resource)
      // Self-referential dependencies are no problem for Postgres, but they
      // are for `dependency-graph`, so we filter those out in this algorithm.
      .filter(resourceName => resourceName !== resource.name)
      .value();

    _.forEach(relations, r => graph.addDependency(resource.name, r));
  });

  // Return them in order
  const order = graph.overallOrder();
  return _.map(order, rName => _.find(resources, r => r.name === rName));
};