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

    // If I submit with text in the field, I expect for an event to get triggered

    // If I submit with no text in the field, I expect for an event NOT to get triggered
    //   (Or text where the trimmed query is empty, e.g. has no spaces)

  });
});