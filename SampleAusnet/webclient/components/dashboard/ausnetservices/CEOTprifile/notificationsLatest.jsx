import React from 'react';
import {Form,Divider,Feed} from 'semantic-ui-react';
import Axios from 'axios';


export default class Notifications extends React.Component {
  constructor(props){
  super(props);
  this.state={
notifications:[],
  }
  this.getNotifications=this.getNotifications.bind(this);
}

static get contextTypes() {

    return {
      socket:React.PropTypes.object.isRequired
    }
  }


componentDidMount()
{
  console.log('today is'+Date.now());
  let today = new Date();
  //let date=today.getDate()+"-"+today.getMonth()+"-"+today.getFullYear();

    var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

let timeStamp=dd+'-'+mm+'-'+yyyy;
console.log('timestamp is' + timeStamp);
  this.getNotifications(timeStamp);
  this.context.socket.on('InitiateJobNotificationWeb',(msg)=>{

    console.log('socket initiated here for notification-------------------');

    var arrStr = msg.split(/[,]/);
      let obj={
        _id:arrStr[0],
        timeStamp:arrStr[1],
        applicationID: arrStr[2],
        message:arrStr[3],
        time: arrStr[4]
      }
      let  newdata=[obj].concat(this.state.notifications)
      console.log('all data of notifications');
      console.log(newdata);
       this.setState({notifications:newdata});
  });

}

getNotifications(timeStamp)
{

  Axios.get('/api/v1/Notification/'+timeStamp)
  .then(function (data) {
    console.log(data.data.message);
    this.setState({notifications:data.data.message});
  }.bind(this))
  .catch(function (error) {
    console.log(error+"error in jobDetail for status");
  });


}



    render () {

    let arr=[];

    this.state.notifications.map((users,i)=>{
    arr.push(
        <p style={{fontSize:10,fontWeight:'bold'}} key={i}>
            <p style={{marginLeft:15,marginBottom:0,marginTop:0}}><span>{users.message}</span><br />
            <span>Application No:</span>{users.applicationID}<br />
            <span style={{color:'grey'}}>{users.time}</span></p>
            <hr />
        </p>
    );
});
    if(arr.length==0){
      arr.push( <div key='one'>No Notifications available</div>)
    };
        return (

            <div style={{marginLeft:10}}>
               <h5>Notifications<br /></h5>
                <div  id="Notify" ref="scrollExample"
                style={{border: '0.3px solid grey',overflowY: 'scroll',overflowX: 'hidden', height: 200 }}>
                    <div>
                            {arr}
                    </div>
                </div>
                <a onClick={this.handleSeeAll} style={{cursor:'pointer'}}><p style={{fontSize:12,textAlign:'Right',fontWeight:'bold'}}>See All</p></a>
     </div>
   );
 }
}
