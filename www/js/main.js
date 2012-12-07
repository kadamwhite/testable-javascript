// "Let's pretend the author of this code felt compelled to use RequireJS for some reason"
define([
  'jquery',
  'underscore'
], function( $, _ ) {
  var tmplCache = {};

  function loadTemplate(name) {
    if ( !tmplCache[ name ] ) {
      // Return a promise, cache it so we don't need to repeat the retrieval
      // Promises new in jQuery > 1.5
      tmplCache[ name ] = $.get( '/templates/' + name );
    }
    return tmplCache[ name ];
  }

  $(function() {

    var resultsList = $( '#results' );
    var liked = $( '#liked' );
    var pending = false;

    $( '#searchForm' ).on( 'submit', function( e ) {
      e.preventDefault();

      if ( pending ) { return; }

      var form = $( this );
      var query = $.trim( form.find( 'input[name="q"]' ).val() );

      if ( !query ) { return; }

      pending = true;

      $.ajax( '/data/search.json', {
        data : { q: query },
        dataType : 'json',
        success : function( data ) {
          loadTemplate('people-detailed.tmpl').then(function(t) {
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