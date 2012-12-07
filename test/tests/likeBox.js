/**
 * Unit tests for the Like Box module
 */
define([
  'likeBox',
  'jquery'
], function( LikeBox, $ ) {
  suite( 'LikeBox Module', function() {
    var lb;

    setup(function() {
      lb = LikeBox();
    });

    teardown(function() {
    });

    test( 'constructor', function() {
      assert( lb );
      assert( lb instanceof LikeBox );
    });

  });
});