/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var PartyView = Backbone.View.extend({

    	tagName: "tr",

        template: JST['app/scripts/templates/party.ejs'],

        events: {

            'click .delete': 'destroy'
        },

        initialize: function () {


        },

        alertUs: function () {

            console.log(this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html( template );

        	return this;
        },

        destroy: function () {

            this.model.destroy();
        }
    });

    return PartyView;
});