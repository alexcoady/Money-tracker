/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/entry-view',
    'models/settings-model'
], function ($, _, Backbone, JST, EntryView, SettingsModel) {
    'use strict';

    var EntryCollectionView = Backbone.View.extend({

    	tagName: "table",

        className: "entry-list table table-bordered table-striped",
        
    	initialize: function () {

            this.collection.on('add remove', this.renderFiltered, this);
    	},

    	renderAll: function () {

    		var that = this;
        
            this.$el.empty();

    		this.collection.each(function (entry) {

    			that.renderOne(entry);
    		});

    		return this;
    	},

    	renderOne: function (entry) {

    		var entryView = new EntryView({ model: entry });
    		
            this.$el.append( entryView.render().el );

    		return this;
    	},

        /*
        *   Function renderFilter
        *   ----------------------------------------------------
        *   Render this collection with a filter applied
        *   ----------------------------------------------------
        *   @param null
        *   @return this: EntryCollectionView object
        */
        renderFiltered: function () {

            var settings = SettingsModel.getInstance();
        }

    });

    return EntryCollectionView;
});