/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/entry-model',
    'models/party-model',
    'collections/entry-collection',
    'collections/party-collection',
], function ($, _, Backbone, JST, EntryModel, PartyModel, EntryCollection, PartyCollection) {
    'use strict';

    var AddEntryView = Backbone.View.extend({

    	el: $('#add-entry'),
        
        template: JST['app/scripts/templates/add-entry.ejs'],

        events: {

            'keypress .input': 'keypress',
            'click .submit': 'addEntry'
        },

        initialize: function () {

            this.formInput = {
                date: {}
            };
        },

        render: function () {

            this.$el.html(this.template());
            this.bindFormElements();
            this.setFormDefaults();

            return this;
        },

        bindFormElements: function () {

            this.formInput.$amount            = this.$('.input-amount');
            this.formInput.$description       = this.$('.input-description');
            this.formInput.$partyName         = this.$('.input-party-name');
            
            this.formInput.date.$day          = this.$('.input-date-day');
            this.formInput.date.$month        = this.$('.input-date-month');
            this.formInput.date.$year         = this.$('.input-date-year');

            return this;
        },

        setFormDefaults: function () {

            var parties = PartyCollection.getInstance(),
                now = new Date();

            this.formInput.$amount.val("").focus();
            this.formInput.$description.val("");
            
            this.formInput.$partyName.val("");

            console.log(parties.pluck('name'));
            
            this.formInput.$partyName.typeahead({
                source: function () {
                    return parties.pluck('name');
                }
            });

            this.formInput.date.$day.val(now.getDate());
            this.formInput.date.$month.val(now.getMonth() + 1);
            this.formInput.date.$year.val(now.getFullYear());

            return this;
        },

        keypress: function (e) {

            if (e.keyCode === 13) {

                e.preventDefault();
                this.addEntry();
            } 
        },

        addEntry: function () {



            // Put together date
            var entryDate = [
                    
                    this.formInput.date.$year.val(), 
                    this.formInput.date.$month.val(), 
                    this.formInput.date.$day.val()
                ],

                entries = EntryCollection.getInstance(),
                parties = PartyCollection.getInstance(),

                // Build new entry
                entry = new EntryModel({
                    
                    amount: this.formInput.$amount.val(),
                    description: this.formInput.$description.val(),
                    party: parties.getCreateByName(this.formInput.$partyName.val()),
                    date: new Date(entryDate),
                    dateAdded: new Date()
                });

            // Add entry to collections
            entries.add(entry);

            // Persist entry
            entry.save();

            this.setFormDefaults();
        }
    });

    return AddEntryView;
});