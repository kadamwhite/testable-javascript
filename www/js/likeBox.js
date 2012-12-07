/**
 * Implementation of Like Box module
 */
define([ 'jquery' ], function( $ ) {
  var LikeBox = function( el ) {
    if( !(this instanceof LikeBox) ) {
      return new LikeBox( el );
    }

    this._names = {};

    this.el = $( el );
  };

  LikeBox.prototype.add = function( name ) {
    if( this._names[ name ] ) { return; }
    // Overhead of this is so minimal it is barely worth it to run
    // this in some smarter way that would only call it once
    this.el.find( '.no-results' ).remove();
    this.el.append( '<li>' + name + '</li>' );
    this._names[ name ] = name;
  };

  return LikeBox;
});