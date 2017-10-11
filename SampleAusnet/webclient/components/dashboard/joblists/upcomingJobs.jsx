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

  let arr=[];
	let upcomingData;
	if(this.props.upcomingArr.length!=0){
  upcomingData=this.props.upcomingArr.map((data,i)=>{
		return(
		<div key={i}>
		<EachupcomingData
			applicationID={data.applicationID}
			status={data.status}
			applicationActiveStatus={data.applicationActiveStatus}
			index={i}
			getAppNoDetails={this.getAppNoDetails}
			>
			</EachupcomingData>
		</div>
	)
})}else{
	upcomingData='No Upcoming Jobs available';
}
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
