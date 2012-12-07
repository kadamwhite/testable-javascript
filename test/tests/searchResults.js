/**
 * Unit tests for the SearchResults module
 */
define([
  'searchResults',
  'jquery',
  'fixtures/searchData'
], function( SearchResults, $, data ) {
  suite( 'SearchResults Module', function() {
    var ul, sr;

    setup(function() {
      ul = $('<ul><li class="no-results"></li></ul>');
      sr = SearchResults( ul );
    });

    teardown(function() {
    });

    test( 'Constructor', function() {
      assert( sr );
      assert( sr instanceof SearchResults );
      //assert( sr.el.length, 'initialization parameter is passed in' );
    });

    test( 'Should start with no results element', function() {
      // More to assure we don't do anything stupid later than to prove it works now
      assert.equal( ul.find('.no-results').length, 1 );
    });

    test( 'Should display received results', function() {
      sr.setResults( data );

      // Make sure the "no results" text has been removed
      assert.equal( ul.find('.no-results').length, 0 );
      // Doesn't just check that there's the right number, but also (implicitly) that
      // the appropriate .results class is present on the rendered list items
      assert.equal( ul.find('li.result').length, data.length );
      // Check to see whether an arbitrary data point matches b/w rendered HTML & data
      assert.equal(
        ul.find('li.result').first().attr('data-name'),
        data[0].name
      );
    });

    test( 'Should announce likes' );

    suite( 'Searching State', function() {
      test( 'Searching state should be set when search is begun', function() {
        sr.setResults( data );
        sr.pending();

        assert.equal( ul.find('li.result').length, 0, 'results items are cleared' );
        assert( ul.html().match('Searching &hellip;'), 'searching text is displayed' );
      });
      test( 'Searching state should be removed when search is finished');
    });
  });
});