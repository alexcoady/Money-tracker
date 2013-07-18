/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var EntryModel = Backbone.Model.extend({
        
        defaults: {
        	amount: 0,
        	description: "",
            party: undefined,
            date: undefined,
            dateAdded: undefined,
            dateUpdated: undefined
        },

        initialize: function () {

        }
    });

    return EntryModel;
});