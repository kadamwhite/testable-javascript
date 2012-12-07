/**
 * Unit tests for the Search Form module
 */
define([ 'searchForm' ], function( SearchForm ) {
  suite( 'Search Form', function() {
    setup(function() {
      // Setup
    });

    teardown(function() {
      // Teardown
    });

    test( 'Constructor', function() {
      var sf = SearchForm();
      assert( sf, 'Constructor returns the module' );
      assert( sf instanceof SearchForm, 'Constructor works without new' );
    });

  });
});