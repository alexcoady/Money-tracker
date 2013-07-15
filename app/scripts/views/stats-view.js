/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/entry-collection',
], function ($, _, Backbone, JST, EntryCollection) {
    'use strict';

    var StatsView = Backbone.View.extend({

        template: JST['app/scripts/templates/stats.ejs'],

        initialize: function () {

        	var entries = EntryCollection.getInstance();

        	entries.on('add edit', this.render, this);
        },

        render: function () {

        	var entries = EntryCollection.getInstance();

        	var template = this.template( { balance: entries.getBalance() } );
        	this.$el.html(template);
        	return this;
        }

    },
    {
    	_instance: undefined,

    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new StatsView();
    		}

    		return this._instance;
    	}
    });

    return StatsView;
});