var controller={};
var notifications=require('./Notification.Model');


controller.getNotifications=function(req,res){

console.log('api connected to get all notificationS');
console.log("from client"+req.params.date);
//console.log(req);
let arr=[];
let flag=0;
notifications.find({timeStamp:req.params.date})
  .sort({'_id': -1})
.exec(function(err,data){
  if(err) {
    console.log('server error in get'+err);
  }
  else{

       res.json({message:data});
     }

     });
}

controller.postNotification=function(req,res){
  console.log('api connected for post operation');
  console.log('data received here for post');
  console.log(req.body);
  notifications.create(req.body,function(err,data){
         if(err) {
           res.send(err);
          }
         else{
           console.log('data after save into db');
           console.log(data);
          res.send({message:data});
         }
       });
  }




exports = module.exports = controller;
