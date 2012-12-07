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

  SearchData.prototype.url = '/data/search.json';

  SearchData.prototype.fetch = function( query ) {
    return $.ajax( this.url, {
      data : { q: query },
      dataType : 'json'
    });
  };

  return SearchData;
});