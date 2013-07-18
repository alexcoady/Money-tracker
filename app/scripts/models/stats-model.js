/*global define*/

define([
    'underscore',
    'backbone',
    'localStorage',
    'collections/entry-collection'
], function (_, Backbone, localStorage, EntryCollection) {
    'use strict';

    var StatsModel = Backbone.Model.extend({

    	localStorage: new Backbone.LocalStorage('money-tracker-stats'),
        
        defaults: {
        	balance: 0,
        	entryCount: 0
        },

        initialize: function () {

        	var entries = EntryCollection.getInstance();

        	entries.on("change add remove", this.generateAll, this);
        	this.generateAll();
        },

        generateBalance: function () {

        	var entries = EntryCollection.getInstance(),
        		balance = this.get("balance");

        	this.set("balance", entries.getBalance());
        	return;
        },

        generateEntryCount: function () {

        	var entries = EntryCollection.getInstance();

        	this.set("entryCount", entries.length);
        	return;
        },

        generateAll: function () {

        	this.generateBalance();
        	this.generateEntryCount();
        }
    },
    {
    	_instance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new StatsModel();
    			this._instance.fetch();
    		}

    		return this._instance;
    	}
    });

    return StatsModel;
});