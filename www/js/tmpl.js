/**
 * Implementation of Template Utility module
 */
define([ 'jquery' ], function( $ ) {
  // We could also make tmplCache a _cache prop on the
  // returned object, to expose it for testing
  var tmplCache = {};

  return {
    get: function( name ) {
      return $.get( '/templates/' + name );
    },
    purgeCache: function() {
      tmplCache = {};
    }
  }
});