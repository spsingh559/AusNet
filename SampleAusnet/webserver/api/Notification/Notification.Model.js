var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AusNetDB');

var notificationSchema = new mongoose.Schema({
    _id:Date,
    timeStamp:String,
    message:String,
    applicationID:String,
    time:String
});
var notifications = mongoose.model('notifications', notificationSchema);
exports = module.exports = notifications;
