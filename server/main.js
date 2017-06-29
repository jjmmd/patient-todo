import { Meteor } from 'meteor/meteor';

import { HTTP } from 'meteor/http'

Meteor.methods({
	FHIRpatientSearch : function (searchString) {

		let result = HTTP.call('GET', "http://learnfhir.aidbox.io/fhir/Patient?family=" + searchString)
		
		return JSON.parse(result.content)
	},
	FHIRcareplan : function () {
		return
	}
})
