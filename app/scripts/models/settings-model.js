/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var SettingsModel = Backbone.Model.extend({
        
        defaults: {
        	filter: "",
        	sort: "date"
        },

        initialize: function () {

            this.set("filters", [
                "income",
                "outcome"
            ]);

            this.set("sorts", [
                "date",
                "amount",
                "description",
                "party"
            ]);
        }
    },
    {
    	_instance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new SettingsModel;
    		}

    		return this._instance;
    	}
    });

    return SettingsModel;
});