import React from 'react';
import {Form,Divider,List,Button} from 'semantic-ui-react';
import JobProgressChild from './JobProgressChild';
export default class JobProgress extends React.Component {


render () {

return (

    <div>
      <Divider horizontal> </Divider>
			<h3 style={{textAlign:'center'}}>Job Progress </h3>
			  <Divider horizontal> </Divider>
				{/* {this.props.jobDetailArr.JobProgress.forEach((data)=>{
					<div>
					<p>{data.name}</p>
					<p>{data.time}</p>
					</div>
				})} */}
			<JobProgressChild data={this.props.jobDetailArr.JobProgress}/>
    </div>
  );
}
}
