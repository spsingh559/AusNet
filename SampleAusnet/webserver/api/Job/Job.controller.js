var controller={};

var mainData=[{
  OperatingAuthNo:'S10-55745-S2',
  ApplicantNumber:'#339525',
  Location:'ELECTRONICS CITY',
  StartTime:'09/10/17 05:30',
  EndTime:'09/10/17 07:30',
  status:'OngoingJobs',
  operatorName:'Tim',
  scheduledInterruptiontime:'06:00 to 07:00'
},
{
  OperatingAuthNo:'S10-55746-S1',
  ApplicantNumber:'#339526',
  Location:'KOROMANGALA',
  StartTime:'09/10/17 08:30',
  EndTime:'09/10/17 09:30',
  status:'OngoingJobs',
  operatorName:'Jack',
  scheduledInterruptiontime:'09:00 to 09:30'
},
{
  OperatingAuthNo:'S10-55747-S2',
  ApplicantNumber:'#339527',
  Location:'SARJAPUR',
  StartTime:'09/11/17 06:00',
  EndTime:'09/11/17 08:00',
  status:'UpcomingJobs',
  operatorName:'NotAssigned',
  scheduledInterruptiontime:'06:30 to 07:30'
},
{
  OperatingAuthNo:'S10-55748-S2',
  ApplicantNumber:'#339528',
  Location:'MAJESTIC',
  StartTime:'09/11/17 13:00',
  EndTime:'09/11/17 15:00',
  status:'UpcomingJobs',
  operatorName:'NotAssigned',
  scheduledInterruptiontime:'13:15 to 14:45'
},
{
OperatingAuthNo:'S10-55749-S1',
ApplicantNumber:'#339529',
Location:'WHITEFIELD',
StartTime:'09/12/17 12:30',
EndTime:'09/12/17 02:30',
status:'UpcomingJobs',
operatorName:'NotAssigned',
scheduledInterruptiontime:'01:00 to 02:00'
},
{
OperatingAuthNo:'S10-55750-S2',
ApplicantNumber:'#339530',
Location:'BOMMANHALLI',
StartTime:'09/12/17 09:00',
EndTime:'09/12/17 11:00',
status:'UpcomingJobs',
operatorName:'NotAssigned',
scheduledInterruptiontime:'09:30 to 10:00'

}
];


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
controller.getJobData=function(req,res){

  console.log('Job  api connected for get job data');
  var data=mainData;
  res.send({message:data});
};

controller.getFilterData=function(req,res){
  //for status
  console.log('filter parameter');
  console.log(req.params);
  // console.log(req.params.ApplicantNumber);
 let arr=[];
  var par=req.params.ApplicantNumber;
  console.log('Application number in get api is' + par);
  console.log(par);
  mainData.forEach((data)=>{
      if(data.status==par){
      arr.push(data);
    }
  });
  res.send({message:arr});

}

controller.getApplicationData=function(req,res){
console.log('get api connected for Application data');
console.log(req.params);
// var ApplicantNumber=req.params.ApplicantNumber;
// console.log('Application number in get api is' + ApplicantNumber.ApplicantNumber);

// mainData.forEach((data)=>{
//   if(data.ApplicantNumber==ApplicantNumber){
//     res.send({message:data});
//   }
// });

}


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
