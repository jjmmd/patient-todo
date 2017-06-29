import { Meteor } from 'meteor/meteor';

import { HTTP } from 'meteor/http'

import { Patients } from '../import/mongo.js'

Meteor.methods({
	FHIRpatientSearch : function (searchString) {

		let result = HTTP.call('GET', "http://learnfhir.aidbox.io/fhir/Patient?family=" + searchString)
		
		return JSON.parse(result.content)
	},
	FHIRcareplan : function (task) {
		let CarePlan = {
			"resourceType" : "CarePlan",
			"status" : "active",
			"activity" : [
				{
					"detail" : {
						"status" : "in-progress",
						"scheduledString" : "Today",
						"description" : "Task #1"
					}
				}
			],
			"note" : [{"key" : "value"}],
			"text" : task
		}

		return CarePlan
    },

    SavePatient : function (patientObject) { // Just throw the whole patient object in Mongo as-is. Mongo can take it. 
        Patients.insert(patientObject)
    },

    ResetPatientList : function () { // Drop the whole thing for a reset
        Patients.rawCollection().drop()
    }
})
