/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var EntryModel = Backbone.Model.extend({
        defaults: {
        	amount: 0,
        	description: "N/A"
        },

        initialize: function () {

        }
    });

    return EntryModel;
});