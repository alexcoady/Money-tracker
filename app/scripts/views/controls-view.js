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

            'click .filter-item': 'changeFilter',
            'click .sort-item': 'changeSort'
        },

        initialize: function () {

            this.model.on("change:filter change:sort", this.render, this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);

        	return this;
        },

        changeFilter: function (e) {

            // TODO: Validate the selected filter from the options in the model
            // or
            // TODO: make options into models, and build collections for SORT and FILTERS
            var filter = e.target.innerHTML;

            if (filter === this.model.get("filter")) {

                this.model.set("filter", undefined);
                return;
            } 

            this.model.set("filter", filter);
        },

        changeSort: function (e) {

            // TODO: Validate the selected filter from the options in the model
            // or
            // TODO: make options into models, and build collections for SORT and FILTERS
            var sort = e.target.innerHTML;

            if (sort === this.model.get("sort")) {

                this.model.set("sort", "date");
                return;
            } 

            this.model.set("sort", sort);
        }
    });

    return ControlsView;
});