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
  let upacomingData=this.props.upcomingArr.map((data,i)=>{
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
 <Divider horizontal>{this.props.jobState}</Divider>
 {upacomingData}

      </div>
    );
  }
}
