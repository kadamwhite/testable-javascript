/*jshint newcap: false*/
/**
 * Unit tests for the SearchData module
 */
define([ 'searchData' ], function( SearchData ) {
  suite( 'SearchData Module', function() {

    test( 'constructor', function() {
      var sd = SearchData();
      assert( sd );
      assert( sd instanceof SearchData );
    });

    suite( 'Request', function() {

      // Again, this is probably snippet-worthy
      var xhr, requests;

      setup(function() {
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function( req ) {
          requests.push( req );
        };
      });

      teardown(function() {
        xhr.restore();
      });

      test( 'Request is made and hits the correct URL', function() {
        var sd = SearchData();
        sd.fetch( 'cat' );

        assert.equal( requests.length, 1, 'makes server request' );
        assert.equal( requests[0].url, '/data/search.json?q=cat', 'url is correct' );
      });

      test( 'Request returns a promise', function() {
        var sd = SearchData();
        var req = sd.fetch( 'cat' );

        assert.isFunction( req.then, 'return has then method' );
      });

      test( 'Don\'t make a request if there is no query', function() {
        var sd = SearchData();
        var req = sd.fetch();

        assert.equal( requests.length, 0 );
      });

      test( 'Not providing a query returns empty array', function() {
        var sd = SearchData();
        var req = sd.fetch();
        var spy = sinon.spy();

        req.then( spy );

        assert.deepEqual( spy.args[0][0], [] );
      });

      test( 'Request returns contents of results property of the response', function() {
        var sd = SearchData();
        var req = sd.fetch( 'cat' );
        var spy = sinon.spy();

        requests[0].respond(
          200,
          { 'Content-type': 'text/json' },
          // Our server will be passing back an array of people, not numbers, but
          // all we need to write this test is a comparable data set: Simple is best,
          // so numbers it is
          JSON.stringify({ results: [1, 2, 3] })
        );

        req.then( spy );

        assert.deepEqual( spy.args[0][0], [1, 2, 3], 'Correct property of the response returned' );
      });
    });
  });
});