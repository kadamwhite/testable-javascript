/**
 * Implementation of Data module
 */
define([ 'jquery' ], function( $ ) {
  var SearchData = function() {
    if( !(this instanceof SearchData ) ) {
      return new SearchData();
    }

    return this;
  };

  SearchData.prototype.fetch = function( query ) {
    return $.get( '/data/search.json', 'json' );
  };

  return SearchData;
});