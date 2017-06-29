import { Mongo } from 'meteor/mongo'

export const Patients = new Mongo.Collection('patients');

if (Meteor.isClient) {
    Meteor.subscribe('patients') // Makes the collection available to the client (Templates and stuff)
};

if (Meteor.isServer) {
    Meteor.publish('patients', function PatientsPublication() {
        return Patients.find({}) // how we publish to the client. For now, just return everything. This can be any valid mongo search string to filter what is actually returned. 
    })
}