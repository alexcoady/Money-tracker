/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/dashboard-model',
    'd3',
], function ($, _, Backbone, JST, DashboardModel, d3) {
    'use strict';

    var DashboardView = Backbone.View.extend({

        el: $('#dashboard'),

        template: JST['app/scripts/templates/dashboard.ejs'],

        initialize: function () {

            this.model.on('change', this.render, this);
            
            //this.collection.on('add remove', this.drawChart, this);

           
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);

            this.$chart = this.$('.chart');

            this.drawChart();

        	return this;
        },

        drawChart: function () {

            var dataset = this.collection.map(function (entry) {

                    return [entry.get("date"), entry.get("amount")];
                }),

                w = this.$chart.width(),
                h = this.$chart.height(),

                scaleX = d3.time.scale()
                                    .domain([ d3.min(dataset, function (d) { console.log(new Date(d[0])); return new Date(d[0]); }), d3.max(dataset, function (d) { console.log(new Date(d[0])); return new Date(d[0]); }) ])
                                    .range([0, w]),
                
                scaleY = d3.scale.linear()
                                    .domain([ d3.max(dataset, function (d) { return d[1]; }), d3.min(dataset, function (d) { return d[1]; }) ])
                                    .range([0, h]),

                svg = d3.select(this.$chart.selector)
                    .append("svg")
                    .attr("width", w)   
                    .attr("height", h);

            svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr({
                    "cx": function (d) {
                        return scaleX(new Date(d[0]));
                    },
                    "cy": function (d) {
                        return scaleY(d[1]);
                    },
                    "r": 10
                });
        }
    });

    return DashboardView;
});