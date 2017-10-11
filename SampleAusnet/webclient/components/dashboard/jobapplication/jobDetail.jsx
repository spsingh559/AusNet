import React from 'react';
import {Divider,Button,Card,Image,Grid} from 'semantic-ui-react';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
export default class JobDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      disabled:'true',
      initiateJobStatus:''
  };
}

  static get contextTypes() {
      return {
        socket:React.PropTypes.object.isRequired
      }
    }
    // componentDidMount=()=>{
    //   this.context.socket.on('initiateJobSocketWeb',(msg)=>{
    //     console.log(msg);
    //     console.log('socket initiated here-------------------');
    //     this.setState({viewStatus:true});
    //   // alert('i hc recv message');
    //   });
    // }
sendApproveMsg=()=>{
  let today = new Date();
		let time = today.getHours() + ":" + today.getMinutes();
let approvalMsg={
  initialMessage:'Job has approved by CEOT',
  ApplicantNumber:this.props.jobDetailArr.applicationID
}
   this.context.socket.emit('approvalNotification',{data:approvalMsg });
   let stepObj={};
   this.props.jobDetailArr.JobProgress.forEach((data)=>{
     if(data.stepID==1){
       stepObj=data;
     }
   });
   console.log('step id 1 is');
   console.log(stepObj);
   let obj={
      requestType:'CEOTApproval',
			applicationID:this.props.jobDetailArr.applicationID,
      status:'Ongoing',
			applicationActiveStatus:false,
			JobProgress:[stepObj,
        {   stepID:2,   name:'CEOT Approval',      time:time,      status:true   	 },
        {      stepID:3, name:'Interuption Time Started',      time:'N/A',      status:false    	 },
				{ stepID:4,     name:'Isolation and Earthing Done',     time:'N/A',      status:false 	 },
				{   stepID:5,   name:'Issue Permit',      time:'N/A',      status:false   	 },
				{     stepID:6, name:'Work Started',     time:'N/A',      status:false  	 },
				{  stepID:7,  name:'Work Completed',    time:'N/A',      status:false    	 },
				{ stepID:8,     name:'Cancel Permit',     time:'N/A',      status:false  	 },
				{ stepID:9,     name:'Isolation and Earthing Removed',     time:'N/A',      status:false  	 },
				{ stepID:10,  name:'Interruption Time Ended',     time:'N/A',      status:false }
      ]
}
this.props.approvalData(obj);
// componentDidMount=()=>{
//   this.context.socket.on('initiateJobSocketWeb', (msg) => {
//
//     // this.setState({initiateJobStatus:true});
//     // alert(msg);
//       // alert(msg.data);
//       // this.setState({chatmessage:msg.data});
//         // console.log('Queued');
//         // this.setState({openDialogue: msg.status,dialogueMessage:msg.message});
//       });
  }

pauseJob=()=>{
  var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    let notificationString = this.props.jobDetailArr.applicationID +','+ 'Job has been paused by CEOT Jacob Mathew,' + time;
    this.context.socket.emit('InitiateJobPauseNotificationCEOT', notificationString);
  alert('request sent to operator');

}

render () {
  console.log('jobDetail component called');
  console.log(this.props.jobDetailArr);
  const {applicationID, operatingAuthNo,
    location, operatorName, recepientName,
    startTime,scheduledInterruptionTime,
    applicationCompletionTime,
    applicationActiveStatus,permitNumber} = this.props.jobDetailArr;
  // console.log(this.props.jobDetailArr.applicationID);
    let buttonStatus;
  let cardStatus=null;
  let status;
  switch (this.props.jobDetailArr.status) {
    case 'NotStarted':if(applicationActiveStatus==false){ buttonStatus=null;   cardStatus=null; status='Not Started';}
                      else{
                        buttonStatus=  [<Button style={{marginLeft:'10',color:'#fff',backgroundColor:'#057EF7 '}} onClick={this.sendApproveMsg} >Approve</Button>  ]
                            cardStatus=null;
                            status='Awaiting Approval'
                          }
      break;
    case 'Ongoing':buttonStatus=[<Button style={{marginLeft:'10',color:'#fff',backgroundColor:'#FB4545'}} onClick={this.pauseJob} >Pause Job</Button>]
                    status='Ongoing'
                  this.props.jobDetailArr.JobProgress.forEach((data)=>{
                    if(data.stepID==5 && data.status==true){
                      cardStatus=[<div><Image src='../images/permit Image.JPG' /> <br /> Permit No: {permitNumber}</div>]
                    }
                  })
    break;
    case 'Completed':buttonStatus=null;
                      status='Completed';
                      cardStatus=[<div><Image src='../images/permit Image.JPG' /> <br /> Permit No: {permitNumber}</div>]
    default:

  }
  let completionTime;
  if(applicationCompletionTime!=''){
    completionTime= ' at ' + applicationCompletionTime;
  }else{
    completionTime='';
  }
return (
  <Grid columns={3} >
     <Grid.Row style={{marginTop:20,textAlign:'center',marginLeft:380,fontWeight:'bold'}}>
       Application {applicationID}
     </Grid.Row>

       <Grid.Row stretched>
         <Grid.Column width={6} style={{marginLeft:20}}>
           Operating Auth. No:<br/>{operatingAuthNo}<br/>
           Location:<br/>{location}<br /><br />
           Scheduled Start time:<br/>{startTime}<br /><br />
           Scheduled Interruption time:<br/>{scheduledInterruptionTime}<br /><br />
           Status: <br />{status} {completionTime}<br />
           <div style={{marginTop:'40'}}>
             {buttonStatus}
           </div>
         </Grid.Column>
         <Grid.Column width={6}>
           <Image src='http://www.freeiconspng.com/uploads/male-icon-4.jpg'  centered shape='circular'
                  style={{width:'65px',height:'35px',borderRadius:70,border:'0.5px solid grey',marginLeft:0,marginTop:0}}/>
           <p>
             <span style={{fontWeight:'bold'}}>Operator</span><br />
             <span>{operatorName}</span>
           </p>
           <Image src='http://www.freeiconspng.com/uploads/male-icon-4.jpg'  centered shape='circular'
                  style={{width:'65px',height:'35px',borderRadius:70,border:'0.5px solid grey',marginLeft:0,marginTop:0}}/>
           <p>
             <span style={{fontWeight:'bold'}}>Recipient</span><br />
             <span>{recepientName}</span>
           </p>
           {/* <div>
             <Button style={{marginLeft:'10',color:'#fff',backgroundColor:'#5D5D5D '}}  disabled={true}>Call</Button>
           </div> */}
        </Grid.Column>
        <Grid.Column width={3}>
          {cardStatus}
        </Grid.Column>
     </Grid.Row>
   </Grid>

//     <div>
//       <Divider horizontal>Application {this.props.jobDetailArr.applicationID}</Divider>
//       <Card.Group itemsPerRow={3} >
//   <Card>
//     <Card.Content>
//       <Card.Header>
//         Operating Auth. No:{this.props.jobDetailArr.operatingAuthNo}<br/>
//       </Card.Header>
//
//       <Card.Description>
//       <b>  Location:</b>{this.props.jobDetailArr.location}<br/>
//         <b>Scheduled Start time</b><br/>{this.props.jobDetailArr.startTime}<br/>
//       <b>  Scheduled Interruption time</b><br/>{this.props.jobDetailArr.scheduledInterruptionTime}<br />
//       <b>  Status:</b> {this.props.jobDetailArr.status}<br/>
//       </Card.Description>
//
//         <div>
//           {buttonStatus }
//
//         </div>
//       </Card.Content>
//
//   </Card>
//   <Card>
//     <Card.Content>
//       <Card.Header>
//        <Image  centered size='mini' src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png'  shape='circular' style={{width:'100px',height:'75px'}}/><br/>
//       </Card.Header>
//       <Card.Meta>
//           operatorName:<br/> {this.props.jobDetailArr.operatorName}<br/><br/>
//       </Card.Meta>
//       <Card.Description>
//     <Image  centered size='mini' src='https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png'  shape='circular' style={{width:'100px',height:'75px'}}/><br/>
//     RecipientName:<br/> {this.props.jobDetailArr.recepientName}
//       </Card.Description>
//     </Card.Content>
//   </Card>
//   {cardStatus}
// </Card.Group>
//     </div>
  );
}
}
