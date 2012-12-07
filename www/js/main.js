// We're now piling up dependencies here
// Eventually we can remove the underscore dependency, since it'll only be used
// in other loaded modules which then in turn require _ when needed
//
// We might eventually also move the function that we pass to document.ready
// into its own module; it would then require util, searchForm and Data and
// we could only include that one searchFormSetup (e.g.) module.
// tmpl would in turn only be needed by the views
define([
  'jquery',
  'underscore',
  'tmpl',
  'searchForm',
  'data'
], function( $, _, templates, SearchForm, SearchData ) {

  $(function() {

    var resultsList = $( '#results' );
    var liked = $( '#liked' );
    var pending = false;

    var searchForm = new SearchForm( $('#searchForm') );
    var searchData = new SearchData();

    searchForm.on( 'search', function( event ) {
      if( pending ) { return; }

      var query = event.detail;
      pending = true;

      searchData.fetch( query ).then( function( results ) {
        templates.get('people-detailed.tmpl').then(function(t) {
          var tmpl = _.template( t );
          resultsList.html( tmpl({ people : results }) );

          pending = false;
        });
      });

      $('<li>', {
        'class' : 'pending',
        html : 'Searching &hellip;'
      }).appendTo( resultsList.empty() );
    });

    resultsList.on( 'click', '.like', function(e) {
      e.preventDefault();
      var name = $( this ).closest( 'li' ).find( 'h2' ).text();
      liked.find( '.no-results' ).remove();
      $( '<li>', { text: name } ).appendTo( liked );
    });

  });

});