/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/entry-collection',
    'views/entry-collection-view',
    'views/stats-view'
], function ($, _, Backbone, JST, EntryCollection, EntryCollectionView, StatsView) {
    'use strict';

    var AppView = Backbone.View.extend({

    	el: $('#app'),

        template: JST['app/scripts/templates/app.ejs'],

        initialize: function () {

        	this.$entries = this.$('#entries');
        	this.$stats = this.$('#stats');

        	this.$entryAddForm = this.$('#entry-add-form');
        	this.$entryAddAmount = this.$('#add-entry-amount');
        	this.$entryAddDescription = this.$('#add-entry-description');
        },

        events: {

        	"keypress .add-form-input": "addEntry"
        },

        render: function () {

        	var entries = EntryCollection.getInstance(),
        		entryCollectionView = new EntryCollectionView({ collection: entries }),
        		statsView = StatsView.getInstance();

        	this.$entries.html( entryCollectionView.render().el );

        	this.$stats.html( statsView.render().el );

        	return this;
        },

        addEntry: function (e) {

        	var entries = EntryCollection.getInstance();

        	if (e.keyCode === 13) {

        		entries.create({
        			amount: this.$entryAddAmount.val(),
        			description: this.$entryAddDescription.val()
        		});

        		this.$entryAddAmount.val("").focus();
        		this.$entryAddDescription.val("");
        	}
        }

    });

    return AppView;
});