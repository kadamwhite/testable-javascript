/*jshint newcap: false*/
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

    test( 'Should announce likes', function() {
      var spy = sinon.spy();

      sr.setResults( data );
      sr.on( 'like', spy );
      ul.find( 'li' ).first().find('.like.btn').click();

      assert( spy.called, 'event handler called' );
      assert.equal( spy.args[0][0].detail, data[0].name, 'event handler received' );
    });

    suite( 'Searching State', function() {
      test( 'Searching state should be set when search is begun', function() {
        sr.pending();

        assert.equal( ul.find('li.searching').length, 1, 'searching text is shown' );
        // Redundant -- you could eliminate the results items are cleared test and only have the
        // last two, b/c if there's only 1 and ('.searching').length === 1, the rest are gone
        assert.equal( ul.find('li').length, 1, 'searching <li> is the only one that is shown' );
      });

      test( 'Previous results are cleared on new search', function() {
        // Set results to ensure that if there ARE results, they get cleared
        sr.setResults( data );
        sr.pending();

        assert.equal( ul.find('li.result').length, 0, 'results items are cleared' );
      });

      test( 'Searching state should be removed when search is finished');
    });
  });
});