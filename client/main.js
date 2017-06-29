import { Template } from 'meteor/templating'

import './main.html'

Template.GetPatientList.onCreated(function () {
	Session.set('patientSearchList', [])
})

Template.GetPatientList.helpers({
	patientSearchResults : function () {
		return Session.get('patientSearchList')
	}
})

Template.GetPatientList.events({
	'click #patientSearch' : function() {
		event.preventDefault()

		let name = $('#patientName').val()
		Meteor.call('FHIRpatientSearch', name, function(err, res) {
			//console.log(err)
			console.log(res)
		})
	}
})