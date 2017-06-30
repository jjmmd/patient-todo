import { Template } from 'meteor/templating'
import { Patients } from '../import/mongo.js'

import './PatientToDo.html'

Template.PatientToDo.onCreated(function () {
	updateTaskList()
})

Template.PatientToDo.helpers({
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

Template.PatientToDo.events({
	'submit' : function (event) {
		event.preventDefault()
		Meteor.call('FHIRaddCarePlan', $('#newTask').val(), Template.instance().data.patient.resource.id)
		updateTaskList()
	},
	'click #completeTask' : function () {
		event.preventDefault()
		Meteor.call('FHIRcompleteCarePlan', this.resource)
		updateTaskList()
	}
})

function updateTaskList() {
	Meteor.call('FHIRgetCarePlan', Template.instance().data.patient.resource.id, function (err, res) {
		Session.set('patientTasks', res.entry)
	})	
}

