import { Mongo } from 'meteor/mongo'

export const Patients = new Mongo.Collection('patients')

if (Meteor.isClient) {
    Meteor.subscribe('patients')
}

if (Meteor.isServer) {
    Meteor.publish('patients', function PatientsPublication() {
        return Patients.find({}, { sort : { status : 1 } })
    })
}