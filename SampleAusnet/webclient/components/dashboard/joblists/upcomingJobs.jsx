import React from 'react';
import {Form,Divider,List,Button} from 'semantic-ui-react';
import EachupcomingData from './EachupcomingData';
export default class UpcomingJobs extends React.Component {


 // handleClick = (e,{value}) =>
 // {
 //  	console.log (value);
 //   this.props.getAppNoDetails(value);
 // }

getAppNoDetails=(applicationID)=>{
	this.props.getAppNoDetails(applicationID);
}
	render () {
		console.log('upcoming component loaded');
  console.log(this.props.upcomingArr);
  let arr=[];
  let upcomingData=this.props.upcomingArr.map((data,i)=>{
		return(
		<div key={i}>
		<EachupcomingData
			applicationID={data.applicationID}
			status={data.status}
			index={i}
			getAppNoDetails={this.getAppNoDetails}
			>
			</EachupcomingData>
		</div>
	)
  })
		return (
			<div>
            <div style={{fontWeight:'bold',color:'#05A1DC ',height:30,backgroundColor:'#DCDCDC ',paddingTop:5}}>
                {this.props.jobState}
            </div>
            <div>
              {upcomingData}
            </div>
        </div>


    );
  }
}
