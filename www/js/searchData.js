/**
 * Implementation of SearchData module
 */
define([
  'jquery',
  'underscore'
], function( $, _ ) {
  var SearchData = function( opts ) {
    if( !(this instanceof SearchData ) ) {
      return new SearchData( opts );
    }

    // This is similar to what backbone does, and lets you set defaults/
    // reconfigure your options on initialization more flexibly.
    // Better than hard-coding 'data/search.json'!
    this.options = {};

    for( var opt in opts ) {
      if( opts.hasOwnProperty(opt) ) {
        this.options[opt] = opts[opt];
      }
    }

    this.defaults = {
      url: '/data/search.json'
    }

    this.settings = _.extend( {}, this.defaults, this.options );
    // You'd probably want this in ALL your constructors, so you'd make
    // a constructor that makes constructors and use that constructor
    // factory for ALL your constructors -RM

    return this;
  };

  SearchData.prototype.fetch = function( query ) {
    if( !query ) {
      // Since not specified what should happen here, we could just 'return;'
      // We could also create a new deferred and resolve it with empty data:
      var dfd = $.Deferred();
      dfd.resolve( [] );
      // Turns out there are security implications to passing around empty
      // arrays in server responses, so it's best to mimic the response
      //
      // Moreover, your server is either (a) probably already written, or
      // (b) out of your control, so using JS to normalize is pretty common
      return dfd.promise();
    }

    return $.ajax( this.settings.url, {
      data : { q: query },
      dataType : 'json'
    }).pipe( function( resp ) {
      // Actually want to return results property:
      // Manipulate the response before anybody else gets it
      return resp.results;
    });
  };

  return SearchData;
});