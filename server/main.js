import { Meteor } from 'meteor/meteor';

import { HTTP } from 'meteor/http'

import { Patients } from '../import/mongo.js'

Meteor.methods({
	FHIRpatientSearch : function (searchString) {

		let result = HTTP.call('GET', "http://learnfhir.aidbox.io/fhir/Patient?family=" + searchString)
		
		return JSON.parse(result.content)
	},
	FHIRcareplan : function (task, patientId) {

		let CarePlan = {
			"resourceType" : "CarePlan",
			"status" : "active",
			"intent" : "plan",
			"subject" : {
				"reference" : "Patient/" + patientId
			},
			"text" : task
		}

		console.log(task)
		console.log(patientId)
		//HTTP.call('POST', "http://learnfhir.aidbox.io/fhir/CarePlan")

		return CarePlan
    },
    AddPatient : function (patientObject) { // Just throw the whole patient object in Mongo as-is. Mongo can take it. 
        Patients.insert(patientObject)
    },
    RemovePatient: function (patientId) { // Delete a patient from the list
        //console.log("patID to remove: " + patientId)
        Patients.remove({ _id : patientId })
    }
})
