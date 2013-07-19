/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'bootstrap',
    'collections/entry-collection',
    'views/entry-collection-view',
    'models/party-model',
    'collections/party-collection',
    'views/party-collection-view',
    'models/stats-model',
    'views/stats-view',
    'views/add-entry-view',
], function ($, _, Backbone, JST, bootstrap, EntryCollection, EntryCollectionView, PartyModel, PartyCollection, PartyCollectionView, StatsModel, StatsView, AddEntryView) {
    'use strict';

    var AppView = Backbone.View.extend({

    	el: $('#app'),

        template: JST['app/scripts/templates/app.ejs'],

        initialize: function () {

        	this.$entries = this.$('#entries');
            this.$dashboard = this.$('#dashboard');
        },

        render: function () {

        	var entries = EntryCollection.getInstance(),
                entryCollectionView = new EntryCollectionView({ collection: entries }),
                stats = StatsModel.getInstance(),
        		statsView = new StatsView({ model: stats });

            // Render entries
            this.$entries.html( entryCollectionView.render().el );

            this.$dashboard.html( statsView.render().el );

            var addEntryView = new AddEntryView();
            addEntryView.render();

        	return this;
        }
    });

    return AppView;
});