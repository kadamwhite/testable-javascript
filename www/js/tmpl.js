/**
 * Implementation of Template Utility module
 */
define([ 'jquery' ], function( $ ) {
  // We could also make tmplCache a _cache prop on the returned object,
  // to expose it so it can be reset during testing
  var tmplCache = {};

  return {
    get: function( name ) {
      if( !tmplCache[ name ] ) {
        tmplCache[ name ] = $.get( '/templates/' + name );
      }
      return tmplCache[ name ];
    },
    purgeCache: function() {
      tmplCache = {};
    }
  }
});