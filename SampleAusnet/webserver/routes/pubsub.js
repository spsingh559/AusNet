var express = require('express');
var router = express.Router();

// var http = require('http').Server(express);
// var io = require('socket.io')(http);

var redis = require("redis");
var sub = redis.createClient(),
pub = redis.createClient();
var msg_count = 0;

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/approve', function(req, res) {
  sub.subscribe("HI");
   sub.on("subscribe", function (channel, count) {
       pub.publish("HI", "1st HI to every one");
       pub.publish("HI", "2nd HI to every one");
       pub.publish("HI", "3rd HI to every one");

   });

   sub.on("message", function (channel, message) {
       console.log("sub channel " + channel + ": " + message);

       msg_count += 1;
       if (msg_count === 3) {
           sub.unsubscribe();
           sub.quit();
           pub.quit();
       }
   });

 res.send("approved");
// sub.subscribe("HI");
});


module.exports = router;
