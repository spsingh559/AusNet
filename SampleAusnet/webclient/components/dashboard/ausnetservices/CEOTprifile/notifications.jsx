import React from 'react';
import {Form,Divider,Feed} from 'semantic-ui-react';
// let users = [
// {
//      "applicationNumber": "#3456840",
//      "message":'Permit Issued',
//             "start": '4:00',
//
// },
// {
//      "id": 1,
//      "applicationNumber": '#3456842',
//      "message":'Job Initiated',
//             "start": '4:00',
// },
// {
//      "id": 2,
//      "applicationNumber": '#3456843',
//      "message":'Isolation done',
//      "start": '4:00',
// },
// {
//      "id": 3,
//      "applicationNumber": '#3456844',
//      "message":'Interuption time Started',
//      "start": '4:00',
//      },
// {
//      "applicationNumber": "#3456840",
//      "message":'Permit Issued',
//             "start": '4:00',
//
// },
// {
//      "id": 1,
//      "applicationNumber": '#3456842',
//      "message":'Job Initiated',
//             "start": '4:00',
// },
// {
//      "id": 2,
//      "applicationNumber": '#3456843',
//      "message":'Isolation done',
//      "start": '4:00',
// },
// {
//      "id": 3,
//      "applicationNumber": '#3456844',
//      "message":'Interuption time Started',
//      "start": '4:00',
//      }
//          ];



export default class Notifications extends React.Component {

  state={
    users: [
    {
         "applicationNumber": "#3456840",
         "message":'Permit Issued',
                "start": '4:00',

    },
    {
         "id": 1,
         "applicationNumber": '#3456842',
         "message":'Job Initiated',
                "start": '4:00',
    },
    {
         "id": 2,
         "applicationNumber": '#3456843',
         "message":'Isolation done',
         "start": '4:00',
    },
    {
         "id": 3,
         "applicationNumber": '#3456844',
         "message":'Interuption time Started',
         "start": '4:00',
         },
    {
         "applicationNumber": "#3456840",
         "message":'Permit Issued',
                "start": '4:00',

    },
    {
         "id": 1,
         "applicationNumber": '#3456842',
         "message":'Job Initiated',
                "start": '4:00',
    },
    {
         "id": 2,
         "applicationNumber": '#3456843',
         "message":'Isolation done',
         "start": '4:00',
    },
    {
         "id": 3,
         "applicationNumber": '#3456844',
         "message":'Interuption time Started',
         "start": '4:00',
         }
             ]
  }
  static get contextTypes() {

  		return {
  			socket:React.PropTypes.object.isRequired
  		}
  	}

    componentDidMount=()=>{
      this.context.socket.on('InitiateJobNotificationWeb',(msg)=>{
        
  			console.log('socket initiated here for notification-------------------');
  				console.log(msg)
          // var s = 'MyLongString:StringIWant;';
          var arrStr = msg.split(/[,]/);
          let obj={
            id:Date.now(),
            "applicationNumber": arrStr[0],
            "message":arrStr[1],
            "start": arrStr[2],
          }
          let  newdata=[obj].concat(this.state.users)
           this.setState({users:newdata});
          //  console.log(users);
          // this.setState({users:newdata});
          console.log(arrStr);
  		});
    }

    render () {

    let arr=[];
    this.state.users.map((users)=>{
    arr.push(
        <p style={{fontSize:10,fontWeight:'bold'}}>
            <p style={{marginLeft:15,marginBottom:0,marginTop:0}}><span>{users.message}</span><br />
            <span>Application No:</span>{users.applicationNumber}<br />
            <span style={{color:'grey'}}>{users.start}</span></p>
            <hr />
        </p>
    );
})
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
