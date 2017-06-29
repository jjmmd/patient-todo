import { Template } from 'meteor/templating'

import './GetPatientList.html'
import Patients from '../import/mongo.js'

Template.GetPatientList.onCreated(function () {
	Session.set('patientSearchList', [])
})

Template.GetPatientList.helpers({
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
	}
})

Template.GetPatientList.events({
	'click #patientSearch' : function(event) {
		event.preventDefault()

		let name = $('#patientName').val()
		Meteor.call('FHIRpatientSearch', name, function(err, res) {
			Session.set('patientSearchList', res.entry)
		})
	},
	'click #addPatient' : function(event) {
		event.preventDefault()

        console.log(this)
        Meteor.call('SavePatient',this)
	}
})