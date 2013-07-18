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
        	// this.$stats = this.$('#stats');
            this.$parties = this.$('#parties');

            // this.$entryAddForm = this.$('#entry-add-form');
            // this.$entryAddAmount = this.$('#add-entry-amount');
            // this.$entryAddDescription = this.$('#add-entry-description');
            // this.$entryAddPartyName = this.$('#add-entry-party-name');

            // this.$entryAddDateForm = this.$('#add-entry-date-form');
            // this.$entryAddDateDay = this.$entryAddDateForm.find('.input-day');
            // this.$entryAddDateMonth = this.$entryAddDateForm.find('.input-month');
            // this.$entryAddDateYear = this.$entryAddDateForm.find('.input-year');

            // this.$partyAddForm = this.$('#party-add-form');
            // this.$partyAddName = this.$('#add-party-name');
        },

        events: {

            // "keypress .add-entry-form-input": "addEntry",
            // "keypress .add-party-form-input": "addParty"
        },

        render: function () {

        	var entries = EntryCollection.getInstance(),
                entryCollectionView = new EntryCollectionView({ collection: entries }),
                parties = PartyCollection.getInstance(),
                partyCollectionView = new PartyCollectionView({ collection: parties }),
                stats = StatsModel.getInstance(),
        		statsView = new StatsView({ model: stats });

            // Render entries
            this.$entries.html( entryCollectionView.render().el );

            // Render parties
            this.$parties.html( partyCollectionView.render().el );

            // Render stats
        	// this.$stats.html( statsView.render().el );

            var addEntryView = new AddEntryView();
            addEntryView.render();

        	return this;
        },

        addEntry: function (e) {

            var entries = EntryCollection.getInstance();
            var parties = PartyCollection.getInstance();

        	if (e.keyCode === 13) {

                e.preventDefault();

        		entries.create({
        			amount: this.$entryAddAmount.val(),
        			description: this.$entryAddDescription.val(),
                    party: parties.getCreateByName(this.$entryAddPartyName.val()),
                    dateAdded: new Date()
        		});

        		this.$entryAddAmount.val("").focus();
                this.$entryAddDescription.val("");
                this.$entryAddPartyName.val("");
        	}
        },

        addParty: function (e) {

            var parties = PartyCollection.getInstance();

            if (e.keyCode === 13) {

                e.preventDefault();

                parties.create({
                    name: this.$partyAddName.val()
                });

                this.$partyAddName.val("").focus();
            }
        }

    });

    return AppView;
});