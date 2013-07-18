/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST, StatsModel) {
    'use strict';

    var StatsView = Backbone.View.extend({

        template: JST['app/scripts/templates/stats.ejs'],

        initialize: function () {

        	this.model.on('change', this.render, this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);
        	return this;
        }
    });

    return StatsView;
});