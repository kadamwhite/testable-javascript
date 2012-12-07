/**
 * Implementation of Utility module
 */
define([ 'jquery' ], function( $ ) {
  // We could also make tmplCache a _cache prop on the
  // returned object, to expose it for testing
  var tmplCache = {};

  return {
    loadTemplate: function( name ) {
      return $.get( '/templates/' + name );
    },
    clearTemplateCache: function() {
      tmplCache = {};
    }
  }
});