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

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new EntryCollection();
    			this._instance.fetch();
    		}

    		return this._instance;
    	}
    });

    return EntryCollection;
});