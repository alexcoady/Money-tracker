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
    'models/dashboard-model',
    'views/dashboard-view',
    'views/add-entry-view',
    'models/settings-model',
    'views/controls-view'
], function ($, _, Backbone, JST, bootstrap, EntryCollection, EntryCollectionView, PartyModel, PartyCollection, PartyCollectionView, DashboardModel, DashboardView, AddEntryView, SettingsModel, ControlsView) {
    'use strict';

    var AppView = Backbone.View.extend({

    	el: $('#app'),

        template: JST['app/scripts/templates/app.ejs'],

        initialize: function () {

        	this.$entries = this.$('#entries');
        },

        render: function () {

        	var entries = EntryCollection.getInstance(),
                visibleEntries = EntryCollection.getVisibleInstance(),
                entryCollectionView = new EntryCollectionView({ collection: visibleEntries }),
                
                dashboard = DashboardModel.getInstance(),
        		dashboardView = new DashboardView({ model: dashboard, collection: visibleEntries }),

                settings = SettingsModel.getInstance(),
                controlsView = new ControlsView({ model: settings });

            visibleEntries.add(entries.slice(0, 10));

            // Render entries
            this.$entries.html( entryCollectionView.render().el );



            dashboardView.render();
            controlsView.render();

            var addEntryView = new AddEntryView();
            addEntryView.render();

        	return this;
        }
    });

    return AppView;
});