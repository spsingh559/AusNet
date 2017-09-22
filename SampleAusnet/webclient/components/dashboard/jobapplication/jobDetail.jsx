import React from 'react';
import {Divider,Button,Card,Image} from 'semantic-ui-react';
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
    case 'Awaiting Approval':buttonStatus=[<RaisedButton label="Approve Job" onTouchTap={this.sendApproveMsg} primary={true}  />]
                              cardStatus=null;
    break;
    case 'Ongoing':buttonStatus=[<RaisedButton label="Pause Job" onTouchTap={this.pauseJob} secondary={true}  />]
                  this.props.jobDetailArr.JobProgress.forEach((data)=>{
                    if(data.stepID==5 && data.status==true){
                      cardStatus=[<Card><Image src='../images/permit Image.JPG' /> </Card>]
                    }
                  })
    break;
    case 'Completed':buttonStatus=null;
                      cardStatus=[<Card><Image src='../images/permit Image.JPG' /> </Card>]
    default:

  }
return (

    <div>
      <Divider horizontal>Application {this.props.jobDetailArr.applicationID}</Divider>
      <Card.Group itemsPerRow={3} >
  <Card>
    <Card.Content>
      <Card.Header>
        Operating Auth. No:{this.props.jobDetailArr.operatingAuthNo}<br/>
      </Card.Header>

      <Card.Description>
      <b>  Location:</b>{this.props.jobDetailArr.location}<br/>
        <b>Scheduled Start time</b><br/>{this.props.jobDetailArr.startTime}<br/>
      <b>  Scheduled Interruption time</b><br/>{this.props.jobDetailArr.scheduledInterruptionTime}<br />
      <b>  Status:</b> {this.props.jobDetailArr.status}<br/>
      </Card.Description>

        <div>
          {buttonStatus }

        </div>
      </Card.Content>

  </Card>
  <Card>
    <Card.Content>
      <Card.Header>
       <Image  centered size='mini' src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png'  shape='circular' style={{width:'100px',height:'75px'}}/><br/>
      </Card.Header>
      <Card.Meta>
          operatorName:<br/> {this.props.jobDetailArr.operatorName}<br/><br/>
      </Card.Meta>
      <Card.Description>
    <Image  centered size='mini' src='https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png'  shape='circular' style={{width:'100px',height:'75px'}}/><br/>
    RecipientName:<br/> {this.props.jobDetailArr.recepientName}
      </Card.Description>
    </Card.Content>
  </Card>
  {cardStatus}
</Card.Group>
    </div>
  );
}
}
