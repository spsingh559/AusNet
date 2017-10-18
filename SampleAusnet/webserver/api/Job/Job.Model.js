var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AusNetDB');

var jobApplicationSchema = new mongoose.Schema({
    _id:Date,
    applicationID:String,
    operatingAuthNo:String,
    location:String,
    startTime:String,
    endTime:String,
    status:String,
    applicationActiveStatus:Boolean,
    operatorName:String,
    operatorContactNumber:String,
    recepientName:String,
    recepientContactNumber:String,
    scheduledInterruptionTime:String,
    applicationCompletionTime:String,
    permitNumber:Number,
    JobProgress:[{
      stepID:Number,
      name:String,
      time:String,
      status:Boolean
    }]
});

var JobApplicationData = mongoose.model('jobapplications', jobApplicationSchema);

exports = module.exports = JobApplicationData;
