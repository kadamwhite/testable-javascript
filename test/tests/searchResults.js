/**
 * Unit tests for the SearchResults module
 */
define([
  'searchData',
  'jquery'
], function( SearchResults, $ ) {
  suite( 'SearchResults Module', function() {
    var ul;

    setup(function() {
      ul = $('<ul><li class="no-results"></li></ul>');
    });

    teardown(function() {
    });

    test( 'Constructor', function() {
      var sr = SearchResults( ul );
      assert( sr );
      assert( sr instanceof SearchResults );
      //assert( sr.el.length, 'initialization parameter is passed in' );
    });

    test( 'Should start with no results element', function() {
      var sr = SearchResults( ul );

      // More to assure we don't do anything stupid later than to prove it works now
      assert.equal( ul.find('.no-results').length, 1 );
    });

    test( 'Should display received results', function() {
      //
    });

    test( 'Should announce likes' );

    suite( 'Searching State', function(){
    });
  });
});