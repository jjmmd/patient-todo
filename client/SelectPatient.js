import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
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
    },
    patientTasks : function () {
        return Session.get('patientTasks')
    },
    completed : function () {
        if(this.resource.status == "completed") {
            return true
        } else {
            return false
        }
    }
})

Template.SelectPatient.events({
    'click #removePatient' : function (event) {
        event.preventDefault()
        Meteor.call('RemovePatient', this.id)
    },
    'click .chosenPatient' : function () {
    	Session.set('selectedPatient', this.resource.id)
        updateTaskList(this.resource.id)
    },
    'submit' : function (event) {
        event.preventDefault()
        Meteor.call('FHIRaddCarePlan', $('#newTask').val(), Session.get('selectedPatient'))
        updateTaskList(Session.get('selectedPatient'))
    },
    'click #completeTask' : function () {
        event.preventDefault()
        Meteor.call('FHIRcompleteCarePlan', this.resource)
        updateTaskList(Session.get('selectedPatient'))
    }
})

function updateTaskList(patientId) {
    Meteor.call('FHIRgetCarePlan', patientId, function (err, res) {
        Session.set('patientTasks', res.entry)
    })  
}