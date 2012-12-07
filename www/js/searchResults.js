/**
 * Implementation of SearchResults module
 */
define([
  'jquery',
  'underscore',
  'tmpl'
], function( $, _, templates ) {
  var SearchResults = function( el ) {
    if( !(this instanceof SearchResults) ) {
      return new SearchResults( el );
    }

    this.el = $( el );

    return this;
  }

  SearchResults.prototype.setResults = function( results ) {
    templates.get( 'people-detailed.tmpl' )
      // _.bind can also bake in that 'results' argument as the first
      // argument of the bound function: The template will then be the
      // second argument
      .then( _.bind( this._populate, this, results ) );
  };

  SearchResults.prototype._populate = function( results, tmpl ) {
    var html = _.template( tmpl, { people: results } );
    // We should probably pre-compile this, but we would want to do that
    // back in tmpl.js: Refactoring possibility
    this.el.html( html );
  };

  // Receive an array of results
  // Display them
  // When there's a search, set searching state
  //   i.e., listen for a search event
  // Announce the "like" event if it happens, the same way the search form announced a search
  //
  // Gotchas:
  // We want to have a template
  // www/templates/people-detailed.tmpl
  //   Expects a person object, then iterates through them
  // In this instance, we're not needing to make a person model because
  // we're rendering out everything using an iterating template.
  // Little to no benefit to breaking this up into a list view and an
  // item view, or even into two templates, because there's so little
  // going on. Definitely not recommended to bind events anywhere than
  // on the parent item, at the very least.

  return SearchResults;
});