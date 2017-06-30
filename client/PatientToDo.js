import { Template } from 'meteor/templating'
import { Patients } from '../import/mongo.js'

import './PatientToDo.html'

Template.PatientToDo.helpers({

})

Template.PatientToDo.events({
	'submit' : function (event) {
		event.preventDefault()

		console.log(Template.instance().data.patient)
	}
})

