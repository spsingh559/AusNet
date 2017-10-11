var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AusNetDB');

var empApplicationSchema = new mongoose.Schema({

    ID:String,
    Name:String,
    Email:String,
    Designation:String,
    ContactNo:String,
    password:String

});

var empapplications = mongoose.model('empapplications', empApplicationSchema);

exports = module.exports = empapplications;
