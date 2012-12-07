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

  LikeBox.prototype.add = function( name ) {
    this.el.find( '.no-results' ).remove();
    this.el.append( '<li>' + name + '</li>' );
  };

  return LikeBox;
});