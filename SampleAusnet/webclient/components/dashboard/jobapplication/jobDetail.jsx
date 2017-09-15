import React from 'react';
import {Divider,Button,Card,Image} from 'semantic-ui-react';
import Axios from 'axios';
export default class JobDetail extends React.Component {

  static get contextTypes() {
      return {
        socket:React.PropTypes.object.isRequired
      }
    }

sendApproveMsg=()=>{
let approvalData={
  initialMessage:'Job has approved by CEOT',
  ApplicantNumber:this.props.jobDetailArr.ApplicantNumber
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
  this.context.socket.on('approvalConfirmation', (msg) => {
    console.log(msg);
    alert(msg.data);
      // alert(msg.data);
      // this.setState({chatmessage:msg.data});
        // console.log('Queued');
        // this.setState({openDialogue: msg.status,dialogueMessage:msg.message});
      });
}

render () {
return (

    <div>
      <Divider horizontal>Application {this.props.jobDetailArr.ApplicantNumber}</Divider>
      <Card.Group itemsPerRow={3} >
  <Card>
    <Card.Content>
      <Card.Header>
        Operating Auth. No:<br/>{this.props.jobDetailArr.OperatingAuthNo}<br/>
      </Card.Header>
      <Card.Meta>
          Status: <br/>{this.props.jobDetailArr.status}<br/>
      </Card.Meta>
      <Card.Description>
        Location:<br/>{this.props.jobDetailArr.Location}<br/>
        Scheduled Start time:<br/>{this.props.jobDetailArr.StartTime}<br/>
        Scheduled Interruption time:<br/>{this.props.jobDetailArr.scheduledInterruptiontime}

      </Card.Description>

        <div>
          <Button basic color='green' onClick={this.sendApproveMsg}>Approve</Button>
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
    RecipientName:<br/> {this.props.jobDetailArr.operatorName}
      </Card.Description>
    </Card.Content>
  </Card>
  <Card>

  </Card>
</Card.Group>
    </div>
  );
}
}
