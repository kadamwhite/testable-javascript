/**
 * Unit tests for the SearchResults module
 */
define([
  'squire',
  'jquery',
  'fixtures/templates'
], function( Squire, $, data, templates ) {
  // How to behave when you need to fake behavior
  var injector = new Squire();

  // We mock out the template contents using the grunt task Build template fixture
  injector.mock( 'tmpl', {
    get: function( name ) {
      // Because the other code (the tests for tmpl) is expecting a promise, we
      // need to return one here: We use the same trick we did within searchData
      var dfd = $.Deferred();
      return dfd.promise();
    },
    purgeResults: function() {}
  }).require([
    'jquery',
    'searchResults',
    'fixtures/searchData'
  ], function( $, SearchResults, data ) {
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
        var sr = SearchResults( ul );
        sr.setResults( data );

        // Make sure the "no results" text has been removed
        assert.equal( ul.find('.no-results').length, 0 );
        // Doesn't just check that there's the right number, but also (implicitly) that
        // the appropriate .results class is present on the rendered list items
        assert.equal( ul.find('li.result').length, data.length );
      });

      // RM: We *could* go in and test for e.g.
      // * Does first person's name end up in <li> #1?
      // * Does each person have a company?
      // * etc
      // At some point we end up testing "did Underscore's templates work"
      // Presentational stuff like that can probably be left to an integration test
      // Otherwise you have to change a *lot* whenever markup changes
      // assert( ul.html().match( data[0].name ) ); // "This is kinda lame"
      // Slightly better perhaps? (Pete's suggestion):
      //   assert.equal(
      //     ul.find('li.result').first().attr('data-name'),
      //     data[0].name
      //   );

      test( 'Should announce likes' );

      suite( 'Searching State', function() {
        test( 'Searching state should be set when search is begun');
        test( 'Searching state should be removed when search is finished');
      });
    });
  });
});