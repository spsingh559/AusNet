const router = require('express').Router();
var bodyParser = require('body-parser').json();
console.log('request reach to router of Notification');
console.log('new update');
 const notificationController = require('./Notification.controller.js');
 var notificationData=require('./Notification.Model');
 console.log("daw3g undhu");
router.get('/:date', notificationController.getNotifications);
router.post('/',notificationController.postNotification);



exports = module.exports = router;
