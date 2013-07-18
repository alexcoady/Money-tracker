/*global define*/

define([
    'underscore',
    'backbone',
    'models/party-model',
    'localStorage',
], function (_, Backbone, PartyModel, localStorage) {
    'use strict';

    var PartyCollection = Backbone.Collection.extend({
        
        model: PartyModel,

        localStorage: new Backbone.LocalStorage('money-tracker-parties'),

        getCreateByName: function (name) {

            var party = this.findWhere({ "name": name });
            
            if (!party) {

                this.create({
                    "name": name
                });

                party = this.findWhere({ "name": name });
            }            

            return party; 
        }
    },
    {
    	_instance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new PartyCollection();
    			this._instance.fetch();
    		}

    		return this._instance;
    	}
    });

    return PartyCollection;
});