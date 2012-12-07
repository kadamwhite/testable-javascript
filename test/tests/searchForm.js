/*jshint newcap: false*/
/**
 * Unit tests for the Search Form module
 */
define([
  'searchForm',
  'jquery',
  'jquery.simulate'
], function( SearchForm, $ ) {
  suite( 'Search Form', function() {
    var formElement;

    setup(function() {
      // Bare minimum HTML needed for search form
      formElement = $('<form><input name="q"><input type="submit"></form>');
      // To start, we'll try doing this without even injecting this into the DOM

      // Question: What do you do when something's pre-rendered, or when you have
      // more complex HTML involved in your view?
      //
      // Answer: You'd generate some sort of fixture. Grunt can create a define()-
      // wrapped object with a raw string of HTML. You'd still need to break the
      // markup into a separate file/unit in order to generate this fixture,
      // however.
      // It also may be that if you have a big chunk of HTML that you can't easily
      // externalize or mock the HTML, then you might not have things broken down
      // sufficiently
    });

    test( 'Constructor', function() {
      var sf = SearchForm( formElement );
      assert( sf, 'Constructor returns the module' );
      assert( sf instanceof SearchForm, 'Constructor works without new' );
      assert( sf._form.length, 'initialization parameter is passed in' );
    });

    // If I submit with text in the field, I expect for an event to get triggered
    test( 'Search event is triggered with query', function() {
      var sf = SearchForm( formElement );
      var spy = sinon.spy();

      // Need to bind handler before firing the event
      sf.on( 'search', spy );

      // Set the value of the input
      formElement.find( 'input[name="q"]' ).val( 'cat' );

      // It would be better to trigger the submit handler through the browser,
      // but since .simulate can't do "submit" this will keep us going for now
      formElement.trigger( 'submit' );

      assert.equal( spy.args[0][0].detail, 'cat', 'query is passed to event' );
    });

    // If I submit with no text in the field, I expect for an event NOT to get triggered
    //   (Or when text where the trimmed query is empty, e.g. has no spaces)
    test( 'No search event is triggered with empty query', function() {

    });

    // Pending search issue is tricky: You don't want the form to have to know
    // about the ongoing search, but you do want to find a way to prevent a
    // search from going out before the previous one completes. Rebecca has used
    // a technique where you lock the search form and then unlock it later to
    // work around this problem.
    suite( 'Locking', function() {
      /*test( 'Form is locked', function() {
        assert.fail();
      });
      test( 'Form can be unlocked', function() {
        assert.fail();
      });
      test( 'Locking prevents search', function() {
        assert.fail();
      });*/
    });
  });
});