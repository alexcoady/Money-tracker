/*global define*/

define([
    'underscore',
    'backbone',
    'models/entry-model',
    'localStorage',
], function (_, Backbone, EntryModel, localStorage) {
    'use strict';

    var EntryCollection = Backbone.Collection.extend({
        
        model: EntryModel,

        localStorage: new Backbone.LocalStorage('money-tracker-entries'),

        comparator: function (entry) {

            return entry.get("date");
        },

        getBalance: function () {

            if (!this.length) return 0;

        	var balance = _.reduce(this.pluck('amount'), function (sum, next) {

        		return +sum + +next;
        	});

            if (balance % 1 !== 0) {
                return balance.toFixed(2);
            } 

            return balance;
        }
    },
    {
    	_instance: undefined,
        _visibleInstance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new EntryCollection();
    			this._instance.fetch();
    		}

    		return this._instance;
    	},

        getVisibleInstance: function () {

            if (this._visibleInstance === undefined) {

                this._visibleInstance = new EntryCollection();
            }

            return this._visibleInstance;
        }
    });

    return EntryCollection;
});