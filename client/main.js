import { Template } from 'meteor/templating'
import { Patients } from '../import/mongo'

import './main.html'
import './GetPatientList.js'


Template.MongoList.events({
    'click #clear': function (event) {
        event.preventDefault()
        Meteor.call('ResetPatientList')
        console.log("clear db")
    }
})

Template.MongoList.helpers({
    patients() {
        return Patients.find({})
    }
})