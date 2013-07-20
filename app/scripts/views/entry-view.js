/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var EntryView = Backbone.View.extend({

    	tagName: "tr",

    	className: "entry-item",
        
        template: JST['app/scripts/templates/entry.ejs'],

        events : {

            'click .delete' : 'destroy'
        },

        initialize: function () {

            this.model.on("change:party", this.render, this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );        	
            this.$el.html( template );

        	return this;
        },

        destroy: function () {

            this.model.destroy();
        }

    });

    return EntryView;
});