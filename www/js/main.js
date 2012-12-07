// "Let's pretend the author of this code felt compelled to use RequireJS for some reason"
define([
  'jquery',
  'underscore',
  'tmpl',
  'searchForm'
], function( $, _, templates, SearchForm ) {

  $(function() {

    var resultsList = $( '#results' );
    var liked = $( '#liked' );
    var pending = false;

    var searchForm = new SearchForm( $('#searchForm') );
    searchForm.on( 'search', function( event ) {
      if( pending ) {
        return;
      }
      var query = event.detail;

      pending = true;

      $.ajax( '/data/search.json', {
        data : { q: query },
        dataType : 'json',
        success : function( data ) {
          templates.get('people-detailed.tmpl').then(function(t) {
            var tmpl = _.template( t );
            resultsList.html( tmpl({ people : data.results }) );
            pending = false;
          });
        }
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