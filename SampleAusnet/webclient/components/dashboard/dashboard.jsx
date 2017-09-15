import React from 'react';
import {Button,Container,Grid} from 'semantic-ui-react';
import AusnetServices from './ausnetservices/ausnetservices.jsx';
import JobList from './joblists/joblist.jsx';
import OngoingJobs from './joblists/ongoingJobs.jsx';
import UpcomingJobs from './joblists/upcomingJobs.jsx';
import CompletedJobs from './joblists/completedJobs.jsx';
import JobApplication from './jobapplication/JobApplication.jsx'
import Axios from 'axios';
//import Config from '../../../config/url';
export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
        jobState:'',
				jobData:[],
				jobData1:[],
				upcomingArr:[],
				ongoingArr:[],
				completedArr:[],
				upcomingArrlen:'',
				ongoingArrlen:'',
				completedArrlen:'',
				Alllength:'',
				jobDetailArr:[]

	};

}
//to get job  Details of a particular application number
getAppNoDetails=(data)=>
{
	this.getJobProfile(data);
}

// api function to get job  Details of a particular application number
getJobProfile=(localApplicationNumber)=>
{
 Axios.get('/api/v1/Job/')
 .then(function (data) {
	 data.data.message.forEach((data)=>{
		 if(data.ApplicantNumber==localApplicationNumber){
			 //set the state here for individual application number -------------- later we ll do server side api for each application number
			 this.setState({jobDetailArr:data});
		 }
	 })
 }.bind(this))
 .catch(function (error) {
	 console.log(error+"error in jobDetail for status");
 });
}

//api function to get all Job Details
getjobDetails=()=>{
									 Axios({
											 method:'get',
													 url:'/api/v1/Job',
									 }).then((result) => {

										// this.setState({jobData:result.data.message});
										  let arr=[],arr1=[],arr2=[];
										result.data.message.forEach((data,i)=>{
								     //to filter jobs acc. to stages
								      if(data.status=='UpcomingJobs')
								      {
								        arr.push(data);


								    }
										else if(data.status=='OngoingJobs')
										{
											arr1.push(data);


									}
									else if(data.status=='CompletedJobs'){
										arr2.push(data);

									}


								    })

								     this.setState({upcomingArr:arr});
										 this.setState({ongoingArr:arr1});
										 this.setState({completedArr:arr2});
														}).catch((error) => {
																		console.log(error);
																		console.log(error+"error in job api for get");
														});
							 }

							 //api function to get a particular jobstate details
							 handleJobFilter=(data)=>{

          Axios.get('/api/v1/Job/'+data)
          .then(function (data) {
						console.log(data.data.message);
            this.setState({jobData:data.data.message});
						console.log(this.state.jobData);
          }.bind(this))
          .catch(function (error) {
            console.log(error+"error in jobDetail for status");
          });
        }

//get job state from child Component
handleJobStages=(data)=>
{
	this.state.jobState=data;
 this.setState({jobState:this.state.jobState});

	if(this.state.jobState=='ALL')
	{
		this.getjobDetails();
	}
	else {
		this.handleJobFilter(this.state.jobState);
	}

}

//to get no of jobs in a particular jobState
getNumberOfJobs=()=>
{
	Axios({
			method:'get',
					url:'api/v1/Job',
	}).then((result) => {

	//  this.setState({jobData1:result.data.message});

		 let arr=[],arr1=[],arr2=[];
	 result.data.message.forEach((data,i)=>{

		 if(data.status=='UpcomingJobs')
		 {
			 arr.push(data);


	 }
	 else if(data.status=='OngoingJobs')
	 {
		 arr1.push(data);

 }
 else if(data.status=='CompletedJobs'){
	 arr2.push(data);

 }


	 })
	 this.setState({upcomingArrlen:arr.length});
	 this.setState({ongoingArrlen:arr1.length});
	 this.setState({completedArrlen:arr2.length});
	let len=result.data.message.length;
	 this.setState({Alllength:len})

					 }).catch((error) => {
									 console.log(error);
									 console.log(error+"error in job api for get");
					 });
}

//to render componenet based on jobState
jobFilter=(data)=>
{
if(data=='ALL'){

	return <JobList jobState={this.state.jobState}  upcomingArr={this.state.upcomingArr} ongoingArr={this.state.ongoingArr} completedArr={this.state.completedArr} getAppNoDetails={this.getAppNoDetails}/>
}
else if (data=='UpcomingJobs') {

	return <UpcomingJobs jobState={this.state.jobState} upcomingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else if (data=='OngoingJobs') {
	return <OngoingJobs jobState={this.state.jobState} ongoingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else  {
	return <CompletedJobs jobState={this.state.jobState} completedArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
}

//to get no. of jobs and to render the upcoming jobs when loaded initially
componentDidMount()
{
	this.getNumberOfJobs();
	this.state.jobState='UpcomingJobs';
	this.setState({jobState:this.state.jobState});
		this.handleJobFilter(this.state.jobState);
}
	render () {

		return (
			<div >
				<Container>
					<h1></h1>
 <Grid columns={3} divided >
	 <Grid.Row stretched>
		 <Grid.Column width={4} style={{background:'#ABEBC6'}}>
			 <AusnetServices handleJobStages={this.handleJobStages} upcomingArrlen={this.state.upcomingArrlen} ongoingArrlen={this.state.ongoingArrlen} completedArrlen={this.state.completedArrlen} Alllength={this.state.Alllength}/>
			 <br></br>
			  <br></br>
				 <br></br>
		 <Button color='teal'>dialer</Button>
		 </Grid.Column>

		 <Grid.Column width={4} style={{background:'#D5F5E3'}}>
			{this.jobFilter(this.state.jobState)}

		 </Grid.Column>

		 <Grid.Column width={8} style={{background:'#EAFAF1'}}>
<JobApplication  jobDetailArr={this.state.jobDetailArr}/>


		 </Grid.Column>
	 </Grid.Row>
 </Grid>

</Container>
</div>


		);
	}
}