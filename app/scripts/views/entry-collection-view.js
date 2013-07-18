/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/entry-view',
    'models/stats-model',
], function ($, _, Backbone, JST, EntryView, StatsModel) {
    'use strict';

    var EntryCollectionView = Backbone.View.extend({

    	tagName: "table",

    	className: "entry-list table table-bordered",

    	initialize: function () {

            this.collection.on('add', this.renderOne, this);
            this.collection.on('remove', this.render, this);
    	},

    	render: function () {

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
    	}

    });

    return EntryCollectionView;
});