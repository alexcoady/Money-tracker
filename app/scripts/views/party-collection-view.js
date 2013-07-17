/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/party-view',
], function ($, _, Backbone, JST, PartyView) {
    'use strict';

    var PartyCollectionView = Backbone.View.extend({

		tagName: "table",

		className: "table table-bordered",

		events: {

		},

		initialize: function () {

			this.collection.on('add', this.renderOne, this);
            this.collection.on('remove', this.render, this);
		},

		render: function () {

    		var that = this;
            this.$el.empty();
    		this.collection.each(function (party) {

    			that.renderOne(party);
    		});

    		return this;
    	},

    	renderOne: function (party) {

    		var partyView = new PartyView({ model: party });
    		this.$el.append( partyView.render().el );

    		return this;
    	}

    });

    return PartyCollectionView;
});