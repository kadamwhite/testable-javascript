/**
 * Unit tests for the SearchResults module
 */
define([
  'searchData',
  'jquery'
], function( SearchResults, $ ) {
  suite( 'SearchResults Module', function() {

    setup(function() {
    });

    teardown(function() {
    });

    test( 'constructor', function() {
      var sr = SearchResults();
      assert( sr );
      assert( sr instanceof SearchResults );
    });
  });
});