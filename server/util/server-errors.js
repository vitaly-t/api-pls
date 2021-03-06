'use strict';

module.exports = {
  notFound: {
    code: 404,
    body() {
      return {
        title: 'Resource Not Found',
        detail: 'The requested resource does not exist.'
      };
    }
  },

  contentTypeHasParams: {
    code: 415,
    body() {
      return {
        title: 'Invalid Content-Type Header',
        detail: 'The header "Content-Type: application/vnd.api+json" cannot have media type parameters.'
      };
    }
  },

  acceptsHasParams: {
    code: 406,
    body() {
      return {
        title: 'Invalid Accepts Header',
        detail: 'No instances of the JSON API media type in the Accepts header were specified without media type parameters.'
      };
    }
  },

  generic: {
    code: 500,
    body() {
      return {
        title: 'Server Error',
        detail: 'The server encounted an error while processing your request'
      };
    }
  }
};
