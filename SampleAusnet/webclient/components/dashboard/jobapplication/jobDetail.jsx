import React from 'react';
import {Divider,Button,Card,Image,Grid} from 'semantic-ui-react';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
export default class JobDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      disabled:'true',
      initiateJobStatus:'',
  };
}

  static get contextTypes() {
      return {
        socket:React.PropTypes.object.isRequired
      }
    }

sendApproveMsg=()=>{
let approvalData={
  initialMessage:'Job has approved by CEOT',
  ApplicantNumber:this.props.jobDetailArr.applicationID
}

   this.context.socket.emit('approvalNotification',{data:approvalData });
  //let data1='approved';
  // Axios({
  //     method:'get',
  //         url:'/approve',
  // }).then(function (data) {
  //   console.log(data);
  //
  // }.bind(this))
  // .catch(function (error) {
  //   console.log(error+"error in jobDetail for status");
  // });
}
componentDidMount=()=>{
  this.context.socket.on('initiateJObSocketWeb', (msg) => {
    this.setState({initiateJobStatus:true});
    // alert(msg);
      // alert(msg.data);
      // this.setState({chatmessage:msg.data});
        // console.log('Queued');
        // this.setState({openDialogue: msg.status,dialogueMessage:msg.message});
      });
}

pauseJob=()=>{
  alert('request sent to operator');
}

render () {
  let buttonStatus;
  let cardStatus=null;
  switch (this.props.jobDetailArr.status) {
    case 'NotStarted':  buttonStatus=null;
                          cardStatus=null;
      break;
    case 'Awaiting Approval':buttonStatus=[<Button style={{marginLeft:'10',color:'#fff',backgroundColor:'#057EF7 '}} onClick={this.sendApproveMsg} >Approve</Button>  ]
                              cardStatus=null;
    break;
    case 'Ongoing':buttonStatus=[<Button style={{marginLeft:'10',color:'#fff',backgroundColor:'#FB4545'}} onClick={this.pauseJob} >Pause Job</Button>]
                  this.props.jobDetailArr.JobProgress.forEach((data)=>{
                    if(data.stepID==5 && data.status==true){
                      cardStatus=[<div><Image src='../images/permit Image.JPG' /> <br /> Permit No: {this.props.jobDetailArr.permitNumber}</div>]
                    }
                  })
    break;
    case 'Completed':buttonStatus=null;
                      cardStatus=[<div><Image src='../images/permit Image.JPG' /> <br /> Permit No: {this.props.jobDetailArr.permitNumber}</div>]
    default:

  }
return (
  <Grid columns={3} >
     <Grid.Row style={{marginTop:20,textAlign:'center',marginLeft:380,fontWeight:'bold'}}>
       Application {this.props.jobDetailArr.applicationID}
     </Grid.Row>

       <Grid.Row stretched>
         <Grid.Column width={6} style={{marginLeft:20}}>
           Operating Auth. No:<br/>{this.props.jobDetailArr.operatingAuthNo}<br/>
           Location:<br/>{this.props.jobDetailArr.location}<br /><br />
           Scheduled Start time:<br/>{this.props.jobDetailArr.startTime}<br /><br />
           Scheduled Interruption time:<br/>{this.props.jobDetailArr.scheduledInterruptionTime}<br /><br />
           Status: <br />{this.props.jobDetailArr.status}<br />
           <div style={{marginTop:'40'}}>
             {buttonStatus}
           </div>
         </Grid.Column>
         <Grid.Column width={6}>
           <Image src='http://www.freeiconspng.com/uploads/male-icon-4.jpg'  centered shape='circular'
                  style={{width:'65px',height:'35px',borderRadius:70,border:'0.5px solid grey',marginLeft:0,marginTop:0}}/>
           <p>
             <span style={{fontWeight:'bold'}}>Operator</span><br />
             <span>{this.props.jobDetailArr.operatorName}</span>
           </p>
           <Image src='http://www.freeiconspng.com/uploads/male-icon-4.jpg'  centered shape='circular'
                  style={{width:'65px',height:'35px',borderRadius:70,border:'0.5px solid grey',marginLeft:0,marginTop:0}}/>
           <p>
             <span style={{fontWeight:'bold'}}>Recipient</span><br />
             <span>{this.props.jobDetailArr.recepientName}</span>
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
