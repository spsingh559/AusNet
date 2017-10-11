var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var redis = require("redis");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
const router = require('express').Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));
app.use('/api/v1/',require('./router'));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));
var server = http.createServer(app);
//socket Part started


var io = require('socket.io').listen(server);
io.on('connection',function(socket){
  console.log('SOCKET CONNECTED');
  var redisClient = redis.createClient({host:'127.0.0.1',port:6379});
  var publishClient = redis.createClient({host:'127.0.0.1',port:6379});
// const redis = require('redis');
// var redisClient = redis.createClient({host:'127.0.0.1',port:6379});

  // redisClient.subscribe('ApprovalChanel');
  redisClient.subscribe('InitiateJobRequestRedisV1');
  redisClient.subscribe('InitiateJobNotificationRedis');
  redisClient.subscribe('InitiateJobPauseNotificationRedis');
  redisClient.subscribe('JobActivityMsgRedis');
  redisClient.subscribe('JobCompletionMsgRedis');
  console.log('subscribe here');
  redisClient.on('message', (channel, message) => {
 console.log('-----------subscribe get data----------');
 // io.emit('approvalConfirmation', {data:message});
  // console.log(message.data);
 if(channel=='InitiateJobRequestRedisV1'){
   console.log('message received for job initiation');
   console.log( message);
    io.emit('initiateJobSocketWeb', message);
 }else if(channel=='InitiateJobNotificationRedis'){
   console.log('message recv for notification');
   console.log(message);
     io.emit('InitiateJobNotificationWeb', message);
 }else if(channel=='JobActivityMsgRedis'){
   console.log('message receive for Job Activity');
   console.log(message);
   io.emit('JobActivityMsgWeb',message);
 }else if(channel=='JobCompletionMsgRedis'){
   console.log('message rcv for Job Completion');
     io.emit('JobCompletionMsgWeb',message);
   }
   else if(channel=='InitiateJobPauseNotificationRedis'){
     console.log('message rcv for Job Completion');{
       io.emit('InitiateJobPauseNotificationWeb',message);
     }
 }
});


socket.on('approvalNotification', function(msg){
  // var publishClient = redis.createClient();
  // publishClient.publish('ApprovalChanel', 'Data publish');

  console.log('message: ' + msg.data.ApplicantNumber);
  var confirmationData={
    message:'Confirmation sent successfull',
    ApplicantNumber:msg.data.ApplicantNumber
  };
  console.log('publish here');

  // var publishClient = redis.createClient({host:'127.0.0.1',port:6379});
  publishClient.publish('ApprovalChanelV1', 'Your Job has been approved');
  // io.emit('approvalConfirmation', {data:confirmationData});
});

socket.on('InitiateJobPauseNotificationCEOT',function(msg){
  publishClient.publish('InitiateJobPauseNotificationCEOTRedis',msg);
});

 });

//Listening to port 8081

server.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }
    console.log("Server started at 8080");
});
