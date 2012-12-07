/**
 * Unit tests for the Util module
 */
define([ 'util' ], function( util ) {
  suite( 'Util', function() {

    // RM: "I'm envisioning that util thing is going to be an object with a
    // loadTemplate method on it"
    suite( 'loadTemplate', function() {
      // We want to test that we make the initial request to the right URL
      //   Could make one request to ensure it's to the right URL,
      //   another to ensure we made the request at all
      test( 'first request hits the server', function() {
        assert.fail();
      });
      test( 'request is to correct url', function() {
        assert.fail();
      });
      // We want to test that we don't make a second request when we ask for the same template again
      test( 'caching', function() {
        assert.fail();
      });
      // We want to make sure we can call "then" on the response
      test( 'return value is a promise', function() {
        assert.fail();
      });
      // We want to make sure that it doesn't manipulate the response, just passes it through
      test( 'server response is passed through', function() {
        assert.fail();
      });
    });
  });
});