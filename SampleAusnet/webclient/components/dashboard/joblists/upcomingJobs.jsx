import React from 'react';
import {Form,Divider,List,Button} from 'semantic-ui-react';
export default class UpcomingJobs extends React.Component {

	constructor() {
    super();
    this.state = {
    appno:''
  };
}
 handleClick = (e,{value}) =>
 {
	//  alert('we clciked');
	 console.log (value);
	//  this.state.appno=value ;
	//  this.setState({ appno:this.state.appno});
	//  console.log(this.state.appno);
	  this.props.getAppNoDetails(value);
 }


	render () {
  console.log(this.props.upcomingArr);
  let arr=[];
  this.props.upcomingArr.forEach((data,i)=>{
		arr.push(<div key={i}>
			<List >
			<List.Item value={data.ApplicantNumber} onClick={this.handleClick} >

					<List.Header as='a' >Application number:{data.ApplicantNumber }</List.Header>
					<List.Description as='a' >Status:{data.status }</List.Description>
					<br></br>

			</List.Item>

		</List>
		</div>);

  })
		return (

      <div>
 <Divider horizontal>{this.props.jobState}</Divider>
{arr}
      </div>
    );
  }
}
