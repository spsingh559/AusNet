import React from 'react';
import {Form,Divider,Feed} from 'semantic-ui-react';
const users = [
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
         ];
export default class Notifications extends React.Component {

    render () {

    let arr=[];
    users.map((users)=>{
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
