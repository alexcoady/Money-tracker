/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'bootstrap',
    'collections/entry-collection',
    'views/entry-collection-view',
    'collections/party-collection',
    'views/party-collection-view',
    'views/stats-view'
], function ($, _, Backbone, JST, bootstrap, EntryCollection, EntryCollectionView, PartyCollection, PartyCollectionView, StatsView) {
    'use strict';

    var AppView = Backbone.View.extend({

    	el: $('#app'),

        template: JST['app/scripts/templates/app.ejs'],

        initialize: function () {

        	this.$entries = this.$('#entries');
        	this.$stats = this.$('#stats');
            this.$parties = this.$('#parties');

        	this.$entryAddForm = this.$('#entry-add-form');
        	this.$entryAddAmount = this.$('#add-entry-amount');
            this.$entryAddDescription = this.$('#add-entry-description');
            this.$entryAddPartyName = this.$('#add-entry-party-name');

            this.$partyAddForm = this.$('#party-add-form');
            this.$partyAddName = this.$('#add-party-name');
        },

        events: {

            "keypress .add-entry-form-input": "addEntry",
            "keypress .add-party-form-input": "addParty"
        },

        render: function () {

        	var entries = EntryCollection.getInstance(),
                entryCollectionView = new EntryCollectionView({ collection: entries }),
                parties = PartyCollection.getInstance(),
                partyCollectionView = new PartyCollectionView({ collection: parties }),
        		statsView = StatsView.getInstance();

            // Render entries
            this.$entries.html( entryCollectionView.render().el );

            console.log(this.$entryAddPartyName);

            this.$entryAddPartyName.typeahead({
                source: parties.pluck('name')
            });
            
            // Render parties
            this.$parties.html( partyCollectionView.render().el );

            // Render stats
        	this.$stats.html( statsView.render().el );

        	return this;
        },

        addEntry: function (e) {

        	var entries = EntryCollection.getInstance();

        	if (e.keyCode === 13) {

                e.preventDefault();

        		entries.create({
        			amount: this.$entryAddAmount.val(),
        			description: this.$entryAddDescription.val()
        		});

        		this.$entryAddAmount.val("").focus();
        		this.$entryAddDescription.val("");
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