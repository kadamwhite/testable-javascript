/**
 * Unit tests for the Like Box module
 */
define([
  'likeBox',
  'jquery'
], function( LikeBox, $ ) {
  suite( 'LikeBox Module', function() {
    var lb;

    setup(function() {
      ul = $('<ul><li class="no-results"></li></ul>');
      lb = LikeBox( ul );
    });

    teardown(function() {
    });

    test( 'constructor', function() {
      assert( lb );
      assert( lb instanceof LikeBox );
    });

    test( 'Should start with no liked items', function() {
      // More to assure we don't do anything stupid later than to prove it works now
      assert.equal( lb.el.find('.no-results').length, 1 );
      assert.equal( lb.el.find('li').length, 1 );
    });

    test( 'Should display liked items', function() {
      var testName = 'KAdam White';
      lb.add( testName );

      // Make sure the "no results" text has been removed
      assert.equal( ul.find('.no-results').length, 0, 'no-results text is cleared' );
      // Doesn't just check that there's the right number, but also (implicitly) that
      // the appropriate .results class is present on the rendered list items
      assert.equal( ul.find('li').length, 1, 'liked item is added' );
      // Check to make sure the name gets rendered
      assert.equal( ul.find('li').first().html(), testName, 'name is rendered' );
    });

  });
});