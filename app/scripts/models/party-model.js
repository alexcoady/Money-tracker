/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var PartyModel = Backbone.Model.extend({
        defaults: {

        	name: "New party"
        }
    });

    return PartyModel;
});