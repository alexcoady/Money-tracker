/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/entry-view',
], function ($, _, Backbone, JST, EntryView) {
    'use strict';

    var EntryCollectionView = Backbone.View.extend({

    	tagName: "ul",

    	className: "entry-list",

    	initialize: function () {

    		this.collection.on('add', this.renderOne, this);
    	},

    	render: function () {

    		var that = this;

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