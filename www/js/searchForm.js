/**
 * Implementation of Search Form module
 */
define([
  'jquery',
  'underscore',
  'rsvp'
], function( $, _, RSVP ) {
  var SearchForm = function( form ) {
    if( !(this instanceof SearchForm ) ) {
      return new SearchForm();
    }

    this._form = $( form );
    this._form.on( 'submit', _.bind( this._handleSubmit, this ) );

    return this;
  };

  SearchForm.prototype._handleSubmit = function( evt ) {
    // RM: I haven't found a great way to test that default is prevented
    // that doesn't feel really messy
    evt.preventDefault();

    // We should store the form as something
    var query = this._form.find('[name="q"]').val();
    this.trigger( 'search', query );

    // Because we've written this trigger method but haven't defined it yet,
    // we're going to pull in RSVP
  };

  RSVP.EventTarget.mixin( SearchForm.prototype );
  // We have now endowed SearchForm with .trigger and .on
  // You can write this yourself in a basic working version in 20-30
  // lines of code; if you want to .off stuff and handle memory better
  // it gets slightly more complicated

  return SearchForm;
});