const mongoose = require('mongoose')
const tokenGen = require('../middleware/token-generator')
const Schema = mongoose.Schema;

const Group = new Schema({
    name: {type: String, required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Location = new Schema({
    lat: {type: Number},
    lng: {type: Number}
})

const token = new Schema({
    value: {type: String, default: tokenGen},
    date: {type: Date, default: Date.now}
})

const schema = new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: token, required: false, default: token},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    groups: [Group],
    lastLocation: {Location}
})

module.exports = mongoose.model('User', schema)