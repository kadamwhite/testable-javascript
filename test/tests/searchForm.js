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
    var formElement, sf;

    setup(function() {
      // Bare minimum HTML needed for search form
      formElement = $('<form><input name="q"><input type="submit"></form>');
      sf = SearchForm( formElement );

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
      assert( sf, 'Constructor returns the module' );
      assert( sf instanceof SearchForm, 'Constructor works without new' );
      assert( sf._form.length, 'initialization parameter is passed in' );
    });

    // If I submit with text in the field, I expect for an event to get triggered
    test( 'Search event is triggered with query', function() {
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
      var spy = sinon.spy();
      sf.on( 'search', spy );

      formElement.find( 'input[name="q"]' ).val( '   ' );
      formElement.trigger( 'submit' );

      assert( !spy.called, 'whitespace properly trimmed' );
    });

    // Pending search issue is tricky: You don't want the form to have to know
    // about the ongoing search, but you do want to find a way to prevent a
    // search from going out before the previous one completes. Rebecca has used
    // a technique where you lock the search form and then unlock it later to
    // work around this problem.
    suite( 'Locking', function() {
      test( 'Form can be locked', function() {
        var spy = sinon.spy();
        sf.on( 'search', spy );

        sf.lock();

        formElement.find( 'input[name="q"]' ).val( 'cat' );
        formElement.trigger( 'submit' );

        // This test is a little redundant to the re-submission test
        assert( !spy.called, 'Form submission disabled while locked' );
      });

      test( 'Form can be unlocked', function() {
        var spy = sinon.spy();
        sf.on( 'search', spy );

        // First search
        formElement.find( 'input[name="q"]' ).val( 'cat' );
        formElement.trigger( 'submit' );

        sf.lock();

        formElement.trigger( 'submit' );

        assert( spy.calledOnce, 'Form submission disabled on lock' );

        sf.unlock();

        // Second search
        formElement.find( 'input[name="q"]' ).val( 'chi' );
        formElement.trigger( 'submit' );

        assert( spy.calledTwice, 'Form submission re-enabled on unlock' );
      });
    }); // Locking suite
  });
});