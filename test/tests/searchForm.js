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
    test( 'Search event is triggered with query', function() {
      assert.fail();
    });

    // If I submit with no text in the field, I expect for an event NOT to get triggered
    //   (Or text where the trimmed query is empty, e.g. has no spaces)
    test( 'No search event is triggered with empty query', function() {
      assert.fail();
    });

    // Pending search issue is tricky: You don't want the form to have to know
    // about the ongoing search, but you do want to find a way to prevent a
    // search from going out before the previous one completes. Rebecca has used
    // a technique where you lock the search form and then unlock it later to
    // work around this problem.
    suite( 'Locking', function() {
      test( 'Form is locked', function() {
        assert.fail();
      });
      test( 'Form can be unlocked', function() {
        assert.fail();
      });
      test( 'Locking prevents search', function() {
        assert.fail();
      });
    });
  });
});