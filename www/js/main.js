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
  'searchForm',
  'searchData',
  'searchResults',
  'likeBox'
], function( $, SearchForm, SearchData, SearchResults, LikeBox ) {

  $(function() {

    // Can remove since nobody else needs to know about it now
    //var resultsList = $( '#results' );
    // Can remove since nobody else needs to know about it now
    // var liked = $( '#liked' );
    var pending = false;

    var searchForm = new SearchForm( $('#searchForm') );
    var searchData = new SearchData();
    var searchResults = new SearchResults( '#results' );
    var likeBox = new LikeBox( '#liked' );

    searchForm.on( 'search', function( event ) {
      if( pending ) { return; }

      var query = event.detail;
      pending = true;

      searchData.fetch( query ).then( function( results ) {
        searchResults.setResults( results );
        pending = false;
      });

      searchResults.pending();
    });

    searchResults.on( 'like', function( evt ) {
      var name = evt.detail;
      likeBox.add( name );
    });

  });

});