/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/entry-collection',
], function ($, _, Backbone, JST, EntryCollection) {
    'use strict';

    var ControlsView = Backbone.View.extend({

    	el: $('#controls'),

        template: JST['app/scripts/templates/controls.ejs'],

        events: {

            'click .filter-item': 'changeFilter'
        },

        initialize: function () {

            this.model.on("change:filter", this.render, this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);

        	return this;
        },

        changeFilter: function (e) {

            var filter = e.target.innerHTML;
            this.model.set("filter", filter);
        }
    });

    return ControlsView;
});