/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        d3: {
            exports: 'd3'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        bootstrap: 'vendor/bootstrap',
        localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        d3: '../bower_components/d3/d3',
    }
});

require([
    'backbone',
    'views/app-view'
], function (Backbone, AppView) {
    Backbone.history.start();

    var appView = new AppView();
    appView.render();
});