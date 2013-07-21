/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/entry-view',
    'models/settings-model',
    'collections/entry-collection',
    'models/party-model',
], function ($, _, Backbone, JST, EntryView, SettingsModel, EntryCollection, PartyModel) {
    'use strict';

    var EntryCollectionView = Backbone.View.extend({

    	tagName: "table",

        className: "entry-list table table-bordered table-striped",
        
    	initialize: function () {

            console.log(this);

            this.collection.on('add remove', this.render, this);
            this.model.on("change", this.render, this);
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
        *   Function render
        *   ----------------------------------------------------
        *   Render this collection with a filter applied
        *   ----------------------------------------------------
        *   @param null
        *   @return this: EntryCollectionView object
        */
        render: function () {

            var that = this,
                filteredEntryCollection = new EntryCollection,
                sortedEntryCollection = new EntryCollection,
                filterValue = this.model.get("filter"),
                sortValue = this.model.get("sort");

            switch (filterValue) {
                case "income": {

                    filteredEntryCollection.set(this.collection.filter(function (entry) {

                        return entry.get("amount") >= 0;
                    }));
                    break;
                }
                case "outcome": {

                    filteredEntryCollection.set(this.collection.filter(function (entry) {

                        return entry.get("amount") < 0;
                    }));
                    break;
                }
                default: {
                    filteredEntryCollection = this.collection;
                }
            }

            switch (sortValue) {
                case "amount": {

                    sortedEntryCollection.set(filteredEntryCollection.sortBy(function (entry) {

                        console.log(entry.get("amount"));
                        return entry.get("amount");
                    }));

                    console.log(sortedEntryCollection);
                    break;
                }
                case "description": {

                    sortedEntryCollection.set(filteredEntryCollection.sortBy(function (entry) {

                        return entry.get("description");
                    }));
                    break;
                }
                case "party": {

                    sortedEntryCollection.set(filteredEntryCollection.sortBy(function (entry) {

                        var party = new PartyModel(entry.get("party"));
                        return party.get("name");
                    }));
                    break;
                }
                default: {
                    sortedEntryCollection = filteredEntryCollection;
                }
            }

            this.$el.empty();
            sortedEntryCollection.each(function (entry) {

                that.renderOne(entry);
            });

            return this;
        },

    });

    return EntryCollectionView;
});