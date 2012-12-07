// We could eventually  move the function that we pass to document.ready
// into its own module; it would then require util, searchForm and Data and
// we could only include that one searchFormSetup (e.g.) module.
// jQuery is needed for $(document).ready() itself.
define([
  'jquery',
  'searchForm',
  'searchData',
  'searchResults',
  'likeBox'
], function( $, SearchForm, SearchData, SearchResults, LikeBox ) {

  $(function() {

    // TODO: Add pending functionality by implementing form locking in searchForm
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