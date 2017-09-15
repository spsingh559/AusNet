var controller={};

var mainData=[{
  Id:1001,
  Name:'Mark',
  Designation:'CEOT',
  ContactNo:'+61 491 570 156',
  Image:'url',
  username:'mark01',
  password:'***********'
},{
  Id:1001,
  Name:'jack',
  Designation:'operator',
  ContactNo:'+61 491 570 156',
  Image:'url',
  username:'jack02',
  password:'***********'
},{
  Id:1001,
  Name:'alice',
  Designation:'operator',
  ContactNo:'+61 491 570 156',
  Image:'url',
  username:'alice03',
  password:'***********'
},
{
  Id:1001,
  Name:'katty',
  Designation:'CEOT',
  ContactNo:'+61 491 570 156',
  Image:'url',
  username:'katty04',
  password:'***********'
}
];

// controller.postEmployeeData=function(req,res){
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



controller.getEmployeeData=function(req,res){

  console.log('Emp  api connected for get emp data');
  var data=mainData;
  // var data= req.body;
  // console.log('post data react to server');
  // console.log(data);

  res.send({message:data});

  //  roleSetting.find({}).exec(function(err,data){
  //         if(err) { console.log('server error in get'+err); }
  //         else{
  //          res.json({message:data});
  //         }
  //       });
};

// controller.getallEmp=function(req,res){
//   console.log('filter parameter');
//   console.log(req.params.parameter);
//   var par=req.params.parameter;
//
//
//
// if(mainData.Designation='CEOT'){
//   res.send({message:mainData})
// }
//
// }


exports = module.exports = controller;
