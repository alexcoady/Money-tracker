/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var EntryView = Backbone.View.extend({

    	tagName: "li",

    	className: "entry-item",
        
        template: JST['app/scripts/templates/entry.ejs'],

        initialize: function () {

        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html( template );

        	return this;
        }


    });

    return EntryView;
});