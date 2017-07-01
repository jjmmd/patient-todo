import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { Patients } from '../import/Patients.js'

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
    FHIRtoggleCarePlanStatus : function (carePlan) {
    	carePlan.status = carePlan.status == "active" ? "completed" : "active"
    	HTTP.call('PUT', "http://learnfhir.aidbox.io/fhir/CarePlan/" + carePlan.id, { data : carePlan })
    },
    FHIRdeleteCarePlan : function (carePlan) {
    	HTTP.call('DELETE', "http://learnfhir.aidbox.io/fhir/CarePlan/" + carePlan.id)
    },
    AddPatient : function (patientObject) { // Just throw the whole patient object in Mongo as-is. Mongo can take it. 
        Patients.insert(patientObject)
    },
    RemovePatient : function (patientId) { // Delete a patient from the list
        Patients.remove({ _id : patientId })
    }
})
