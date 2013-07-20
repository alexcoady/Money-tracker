/*global define*/

define([
    'underscore',
    'backbone',
    'collections/entry-collection'
], function (_, Backbone, EntryCollection) {
    'use strict';

    var DashboardModel = Backbone.Model.extend({
        
        defaults: {
        	balance: 0,
        	entryCount: 0
        },

        initialize: function () {

        	var entries = EntryCollection.getInstance();
        	entries.on("change add remove", this.generateAll, this);
        },

        generateAll: function () {

        	var entries = EntryCollection.getInstance(),
        		balance = this.get("balance");

        	this.set({
                "balance": entries.getBalance(),
                "entryCount": entries.length
            }); 
        }
    },
    {
    	_instance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new DashboardModel();
                this._instance.generateAll();
    		}

    		return this._instance;
    	}
    });

    return DashboardModel;
});