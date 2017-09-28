var controller={};
var JobApplicationData=require('./Job.Model');

// var mainData=[{
//   OperatingAuthNo:'S10-55745-S2',
//   ApplicantNumber:'#339525',
//   Location:'ELECTRONICS CITY',
//   StartTime:'09/10/17 05:30',
//   EndTime:'09/10/17 07:30',
//   status:'OngoingJobs',
//   operatorName:'Tim',
//   scheduledInterruptiontime:'06:00 to 07:00'
// },
// {
//   OperatingAuthNo:'S10-55746-S1',
//   ApplicantNumber:'#339526',
//   Location:'KOROMANGALA',
//   StartTime:'09/10/17 08:30',
//   EndTime:'09/10/17 09:30',
//   status:'OngoingJobs',
//   operatorName:'Jack',
//   scheduledInterruptiontime:'09:00 to 09:30'
// },
// {
//   OperatingAuthNo:'S10-55747-S2',
//   ApplicantNumber:'#339527',
//   Location:'SARJAPUR',
//   StartTime:'09/11/17 06:00',
//   EndTime:'09/11/17 08:00',
//   status:'UpcomingJobs',
//   operatorName:'NotAssigned',
//   scheduledInterruptiontime:'06:30 to 07:30'
// },
// {
//   OperatingAuthNo:'S10-55748-S2',
//   ApplicantNumber:'#339528',
//   Location:'MAJESTIC',
//   StartTime:'09/11/17 13:00',
//   EndTime:'09/11/17 15:00',
//   status:'UpcomingJobs',
//   operatorName:'NotAssigned',
//   scheduledInterruptiontime:'13:15 to 14:45'
// },
// {
// OperatingAuthNo:'S10-55749-S1',
// ApplicantNumber:'#339529',
// Location:'WHITEFIELD',
// StartTime:'09/12/17 12:30',
// EndTime:'09/12/17 02:30',
// status:'UpcomingJobs',
// operatorName:'NotAssigned',
// scheduledInterruptiontime:'01:00 to 02:00'
// },
// {
// OperatingAuthNo:'S10-55750-S2',
// ApplicantNumber:'#339530',
// Location:'BOMMANHALLI',
// StartTime:'09/12/17 09:00',
// EndTime:'09/12/17 11:00',
// status:'UpcomingJobs',
// operatorName:'NotAssigned',
// scheduledInterruptiontime:'09:30 to 10:00'
//
// }
// ];

// controller.getAppNoDetails=function(req,res){
//   console.log('-------------api connected for get each application data-----------');
//   console.log(req.params);
// }
controller.patchoperatorData=function(req,res){
  console.log('api connected for patch operation');
console.log('req rec for job progress');
// console.log(req.body.JobProgress);
if(req.body.requestType=='InitiateJobRequest'){
  JobApplicationData.findOneAndUpdate({applicationID:req.body.applicationID},
                                    {$set:{
                                     operatorName:req.body.operatorName,
                                     operatorContactNumber:req.body.operatorContactNumber,
                                     recepientName:req.body.recepientName,
                                     recepientContactNumber:req.body.recepientContactNumber,
                                     operatingAuthNo:req.body.operatingAuthNo,
                                     applicationActiveStatus:req.body.applicationActiveStatus,
                                     JobProgress:req.body.JobProgress
                    }},function(err, data){
                      if(err) { console.log('server error in get'+err); }
                      else{
                        console.log('result of patch operation in job initiated');
                        // console.log(data);
                        // console.log(data);
                        // console.log(data);
                       res.json({message:data});
                     };

    });
  }
  else if(req.body.requestType=='CEOTApproval'){
    JobApplicationData.findOneAndUpdate({applicationID:req.body.applicationID},
                                      {$set:{
                                       status:req.body.status,
                                       applicationActiveStatus:req.body.applicationActiveStatus,
                                       JobProgress:req.body.JobProgress
                      }},function(err, data){
                        if(err) { console.log('server error in get'+err); }
                        else{
                          console.log('result of patch operation');
                          // console.log(data);
                          // console.log(data);
                          // console.log(data);
                         res.json({message:data});
                       };
  });

}else if (req.body.requestType=='JobActivity') {
  console.log('req reach to server for update of JobActivity');
  console.log(req.body);
  JobApplicationData.findOneAndUpdate({applicationID:req.body.applicationID},
                                    {$set:{
                                     JobProgress:req.body.JobProgress
                    }},function(err, data){
                      if(err) { console.log('server error in get'+err); }
                      else{
                        console.log('result of patch operation');
                        // console.log(data);
                        // console.log(data);
                        // console.log(data);
                       res.json({message:data});
                     };
});
// JobApplicationData.find({applicationID:req.body.applicationID}).sort({'stepID':1})
}else if(req.body.requestType=='JobCompletion'){
  JobApplicationData.findOneAndUpdate({applicationID:req.body.applicationID},
                                    {$set:{
                                     status:req.body.status
                    }},function(err, data){
                      if(err) { console.log('server error in get'+err); }
                      else{
                        console.log('result of patch operation');
                        // console.log(data);
                        // console.log(data);
                        // console.log(data);
                       res.json({message:data});
                     };
});
}
else if(req.body.requestType=='PermitIssued'){
  JobApplicationData.findOneAndUpdate({applicationID:req.body.applicationID},
                                    {$set:{
                                     permitNumber:req.body.permitNumber,
                                     jobProgress:req.body.jobProgress
                    }},function(err, data){
                      if(err) { console.log('server error in get'+err); }
                      else{
                        console.log('result of patch operation in permit issue');
                        // console.log(data);
                        // console.log(data);
                        // console.log(data);
                       res.json({message:data});
                     };
                     });
}

}

controller.getJobData=function(req,res){

  console.log('api connected for get for all application');

   JobApplicationData.find({}).exec(function(err,data){
          if(err) { console.log('server error in get'+err); }
          else{
            // console.log(data);
            // console.log(data);
           res.json({message:data});
          }
        });
};

  // controller.publishMsg=function(req,res){
  //
  //   console.log('========');
  //   console.log('Job  api connected to publishMsg');
  //
  //   var par=req.params.data;
  //   console.log(par);
  //   res.send({message:par});
  // };

// controller.postJobData=function(req,res){
//
//
//   var data= req.body;
//   console.log('post data react to server');
//   console.log(data);
//
//   res.send({message:'Hi data is received on server'});
//
//
// };
// controller.getJobData=function(req,res){
//
//   console.log('Job  api connected for get job data');
//   var data=mainData;
//   res.send({message:data});
// };

controller.getFilterData=function(req,res){
  //for status
 //  console.log('filter parameter');
 //  console.log(req.params);
 //  // console.log(req.params.ApplicantNumber);
 // let arr=[];
  // console.log(req.params.applicationRequest);
  console.log('api connected for status based application data');
  // var par=req.params.applicationRequest;
  console.log(req.params);
  console.log(req.params.applicationRequest);
  if(req.params.applicationRequest=='NotStarted' ||req.params.applicationRequest=='Ongoing'||req.params.applicationRequest=='Completed'){
    JobApplicationData.find({status:req.params.applicationRequest}).exec(function(err,data){
             if(err) { console.log('server error in get'+err); }
             else{
               // console.log(data);
              //  console.log(data);
              res.json({message:data});
             }
           });
  }else{
    JobApplicationData.find({applicationID:req.params.applicationRequest}).exec(function(err,data){
             if(err) { console.log('server error in get'+err); }
             else{
               // console.log(data);
              //  console.log(data);
              res.json({message:data});
             }
           });
  }
  // console.log(req.params.applicationRequest.type);
  // console.log(req.params.applicationRequest[0]);
    // console.log(req.params.applicationRequest[0].type);
      // console.log(req.params.applicationRequest[type]);
      // console.log(req.params.applicationRequest[0].applicationRequest);
      // console.log(req.params.applicationRequest[0].applicationRequest.type);
//   for(var property in req.params.applicationRequest) {
//     console.log(property + "=" + req.params.applicationRequest[property]);
// }
  // res.send({message:req.params.applicationRequest});
  // if(req.params.type=='status'){
  //   JobApplicationData.find({status:req.params.value}).exec(function(err,data){
  //          if(err) { console.log('server error in get'+err); }
  //          else{
  //            // console.log(data);
  //           //  console.log(data);
  //           res.json({message:data});
  //          }
  //        });
  //
  // }else{
  //   JobApplicationData.find({applicationID:req.params.value}).exec(function(err,data){
  //          if(err) { console.log('server error in get'+err); }
  //          else{
  //            // console.log(data);
  //           //  console.log(data);
  //           res.json({message:data});
  //          }
  //        });
  // }
  // console.log(par);
  // if()
 //  console.log('Application number in get api is' + par);
 //  console.log(par);
 //  mainData.forEach((data)=>{
 //      if(data.status==par){
 //      arr.push(data);
 //    }
 //  });
 //  res.send({message:arr});
  // JobApplicationData.find({status:par}).exec(function(err,data){
  //        if(err) { console.log('server error in get'+err); }
  //        else{
  //          // console.log(data);
  //         //  console.log(data);
  //         res.json({message:data});
  //        }
  //      });

}

// controller.getApplicationData=function(req,res){
// console.log('get api connected for Application data');
// console.log(req.params);
// // var ApplicantNumber=req.params.ApplicantNumber;
// // console.log('Application number in get api is' + ApplicantNumber.ApplicantNumber);
//
// // mainData.forEach((data)=>{
// //   if(data.ApplicantNumber==ApplicantNumber){
// //     res.send({message:data});
// //   }
// // });
//
// }


// if(mainData.status='Upcoming'){
//   res.send({message:mainData})
// }


// controller.getJobProfile=function(req,res){
//   console.log('filter parameter');
//   console.log(req.params.ApplicantNumber);
//   var par1=req.params.ApplicantNumber;
//
// let arr=[];
// mainData.forEach((data)=>{
//     if(data.ApplicantNumber==par1){
//     arr.push(data);
//   }
// });
// res.send({message:arr});
//
// // if(mainData.status='Upcoming'){
// //   res.send({message:mainData})
// // }
//
// }


// controller.updatejob=function(req,res){
//   console.log('update api connected');
// var ApplicantNumber=req.body.ApplicantNumber;
// console.log('ApplicantNumber from client is');
// console.log(ApplicantNumber);
// var data1=req.body;
// console.log('data from client is');
// console.log(data1);
// mainData.forEach((data,i)=>{
//   if(data.ApplicantNumber==ApplicantNumber){
//     var updateData =mainData.splice(i, 1,data1);
//   }
// })
// res.send({message:mainData});
//
// }
//
// controller.updateOperator=function(req,res){
//   console.log('update api connected');
// var status=req.body.status;
// console.log('ApplicantNumber from client is');
// console.log(ApplicantNumber);
// var data1=req.body;
// console.log('data from client is');
// console.log(data1);
// mainData.forEach((data,i)=>{
//   if(data.ApplicantNumber==ApplicantNumber){
//     var updateData =mainData.splice(i, 1,data1);
//   }
// })
// res.send({message:mainData});
// }




exports = module.exports = controller;
