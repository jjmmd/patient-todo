import { Template } from 'meteor/templating'
import { Patients } from '../import/mongo'

import './SelectPatient.html'

Template.SelectPatient.onCreated(function () {
	Session.set('selectedPatient', null)
})

Template.SelectPatient.helpers({
    patients : function () {
        return Patients.find({})
    },
    selectedPatient : function () {
    	return Session.get('selectedPatient')
    }
})

Template.SelectPatient.events({
    'click #removePatient' : function (event) {
        event.preventDefault()

        Meteor.call('RemovePatient', this._id)
        //console.log(this)
    },
    'click .chosenPatient' : function () {
    	Session.set('selectedPatient', this)
    }
})