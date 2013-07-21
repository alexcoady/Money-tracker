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

            this.applyFilter();

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);

        	return this;
        },

        changeFilter: function (e) {

            var filter = e.target.innerHTML;

            this.model.set("filter", filter);
        },

        applyFilter: function () {

            var filterValue = this.model.get("filter"),
                entries = EntryCollection.getInstance();
                
            // switch (filterValue) {
            //     case 'income': {

            //         visibleEntries.set(entries.filter(function (entry) { 
                        
            //             if (entry.get("amount") >= 0) {
            //                 return true;
            //             }
            //         }));
            //         break;
            //     }
            //     case 'outcome': {

            //         visibleEntries.set(entries.filter(function (entry) { 
                        
            //             if (entry.get("amount") < 0) {
            //                 return true;
            //             }
            //         }));
            //         break;
            //     }
            // }
        }
    });

    return ControlsView;
});