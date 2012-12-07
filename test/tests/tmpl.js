/**
 * Unit tests for the Template utility module
 */
define([ 'tmpl' ], function( tmpl ) {
  suite( 'Template Utility', function() {

    // RM: "I'm envisioning that tmpl thing is going to be an object with a
    // loadTemplate method on it"
    suite( '.get( template )', function() {
      var xhr, requests;

      setup(function() {
        // Use sinon to fake XHR
        // Build a snippet for this sort of thing: You'll be doing it a lot
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function( req ) {
          requests.push( req );
        };
      });

      teardown(function() {
        xhr.restore();
      });

      test( 'first request is made and hits the correct URL', function() {
        tmpl.get( 'foo.tmpl' );
        assert.equal( requests.length, 1, 'makes server request' );
        assert.equal( requests[0].url, '/templates/foo.tmpl', 'url is correct' );
      });
      // We want to test that we don't make a second request when we ask for the same template again
      test( 'caching', function() {
        // Don't need a template cache clearing function in our application,
        // so (though it is not best practice) we can just use the request
        // from the first test to know we've already loaded it once.
        tmpl.purgeCache();
        tmpl.get( 'foo.tmpl' );
        tmpl.get( 'foo.tmpl' );
        assert.equal( requests.length, 1, 'only makes one request' );
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