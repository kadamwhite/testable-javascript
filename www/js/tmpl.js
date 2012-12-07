/**
 * Implementation of Template Utility module
 */
define([ 'jquery', 'fixtures/templates' ], function( $, templates ) {
  // We could also make tmplCache a _cache prop on the returned object,
  // to expose it so it can be reset during testing
  var tmplCache = {};

  return {
    get: function( name ) {
      if( templates[ name ] ) {
        // Wrong for what we're trying to do, but "not super far-fetched
        // that we might have our templates precompiled somewhere" (albeit
        // that they wouldn't be in a directory called 'fixtures')
        var dfd = $.Deferred();
        dfd.resolve( templates[name] );
        return dfd.promise();
      }

      if( !tmplCache[ name ] ) {
        tmplCache[ name ] = $.get( '/templates/' + name );
      }
      return tmplCache[ name ];
    },
    purgeCache: function() {
      tmplCache = {};
    }
  };
});