/**
 * Unit tests for the SearchData module
 */
define([ 'data' ], function( SearchData ) {
  suite( 'SearchData Module', function() {

    setup(function() {
    });

    teardown(function() {
    });

    test( 'constructor', function() {
      var sd = SeachData();
      assert( sd );
      assert( sd instanceof SearchData );
    });

    suite( 'Request', function() {
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

        assert.equal( requests.length, 1, 'makes server request' );
        assert.equal( requests[0].url, '/data/search.json', 'url is correct' );
      });

      test( 'Request returns a promise', function() {
        var sd = SearchData();
        sd.fetch( 'cat' );
        assert.isFunction( req.then, 'return has then method' );
      });

      test( 'Request returns contents of results property of the response', function() {
        assert.fail();
      });
    });
  });
});