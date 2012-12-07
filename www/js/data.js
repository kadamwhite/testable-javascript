/**
 * Implementation of Data module
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
    return $.ajax( this.settings.url, {
      data : { q: query },
      dataType : 'json'
    });
  };

  return SearchData;
});