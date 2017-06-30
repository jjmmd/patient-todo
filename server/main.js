import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { Patients } from '../import/mongo.js'

Meteor.methods({
	FHIRpatientSearch : function (searchString) {

		let result = HTTP.call('GET', "http://learnfhir.aidbox.io/fhir/Patient?family=" + searchString)
		
		return JSON.parse(result.content)
	},
	FHIRaddCarePlan : function (task, patientId) {

		let CarePlan = {
			"resourceType" : "CarePlan",
			"status" : "active",
			"subject" : {
				"reference" : "Patient/" + patientId
			},
			"description" : task
			}

		HTTP.call('POST', "http://learnfhir.aidbox.io/fhir/CarePlan", { data: CarePlan })
		return
    },
    FHIRgetCarePlan : function (patientId) {
		let result = HTTP.call('GET', "http://learnfhir.aidbox.io/fhir/CarePlan?patient=" + patientId)
		return JSON.parse(result.content)
    },
    FHIRcompleteCarePlan : function (carePlan) {
    	carePlan.status = "completed"
    	HTTP.call('PUT', "http://learnfhir.aidbox.io/fhir/CarePlan/" + carePlan.id, { data : carePlan })
    },
    AddPatient : function (patientObject) { // Just throw the whole patient object in Mongo as-is. Mongo can take it. 
        Patients.insert(patientObject)
    },
    RemovePatient : function (patientId) { // Delete a patient from the list
        Patients.remove({ _id : patientId })
    }
})
