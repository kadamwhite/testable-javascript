/**
 * Implementation of Like Box module
 */
define([ 'jquery' ], function( $ ) {
  var LikeBox = function( el ) {
    if( !(this instanceof LikeBox) ) {
      return new LikeBox( el );
    }

    this.el = $( el );
  };

  return LikeBox;
});