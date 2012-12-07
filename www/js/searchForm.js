/**
 * Implementation of Search Form module
 */
define([ 'jquery' ], function( $ ) {
  var SearchForm = function() {
    if( !(this instanceof SearchForm ) ) {
      return new SearchForm();
    }
    return this;
  };

  return SearchForm;
});