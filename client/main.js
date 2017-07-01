import { Template } from 'meteor/templating'

import { Patients } from '../import/Patients.js'

import './main.html'

Template.body.onCreated(function () {
	Session.set('patientSearchList', [])
	Session.set('selectedPatient', null)
})

Template.body.helpers({
	patientSearchResults : function () {
		return Session.get('patientSearchList')
	},
	patientFirstName : function () {
		return this.resource.name[0].given[0]
	},
	patientLastName : function () {
		return this.resource.name[0].family[0]
	},
	patientId : function () {
		return this.resource.id
	},
    patients : function () {
        return Patients.find({})
    },
    selectedPatient : function () {
    	return Session.get('selectedPatient')
    },
    patientTasks : function () {
        return Session.get('patientTasks')
    },
    status : function(status) {
    	return this.resource.status == status
    }
})

Template.body.events({
	'click #patientSearch' : function(event) {
		event.preventDefault()

		let name = $('#patientName').val()
		Meteor.call('FHIRpatientSearch', name, function(err, res) {
				Session.set('patientSearchList', res.entry)
		})
	},
	'click #addPatient' : function(event) {
		event.preventDefault()
        Meteor.call('AddPatient',this)
	},
    'click #removePatient' : function (event) {
        event.preventDefault()
        Meteor.call('RemovePatient', this._id)
    },
    'click .chosenPatient' : function () {
    	Session.set('selectedPatient', this.resource.id)
        updateTaskList(this.resource.id)
    },
    'click #addTask' : function (event) {
        event.preventDefault()
        Meteor.call('FHIRaddCarePlan', $('#newTask').val(), Session.get('selectedPatient'))
        updateTaskList(Session.get('selectedPatient'))
    },
    'click #toggleStatus' : function (event) {
        event.preventDefault()
        Meteor.call('FHIRtoggleCarePlanStatus', this.resource)
        updateTaskList(Session.get('selectedPatient'))
    },
    'click #deleteTask' : function (event) {
    	event.preventDefault()
    	Meteor.call('FHIRdeleteCarePlan', this.resource)
        updateTaskList(Session.get('selectedPatient'))
    }
})

function updateTaskList(patientId) {
    Meteor.call('FHIRgetCarePlan', patientId, function (err, res) {
        Session.set('patientTasks', res.entry)
    })  
}