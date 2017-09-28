import React from 'react';
import {Button,Container,Grid,Search} from 'semantic-ui-react';
import AutoComplete from 'material-ui/AutoComplete';
import AusnetServices from './ausnetservices/ausnetservices.jsx';
import JobList from './joblists/joblist.jsx';
import OngoingJobs from './joblists/ongoingJobs.jsx';
import UpcomingJobs from './joblists/upcomingJobs.jsx';
import CompletedJobs from './joblists/completedJobs.jsx';
import JobApplication from './jobapplication/JobApplication.jsx'
import Axios from 'axios';
//import Config from '../../../config/url';

const fruit = [
  '#339671', '#122390', '#21391',
  '#09123', '#90234u092', '#47389534', '#23843', '#3798423'];


export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
				searchText:'',
				arr:[],
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
getJobProfile=(localApplicationNumber)=>{
	console.log('api call for each application from client');
	console.log('app id is');
	console.log(localApplicationNumber);
 Axios.get('/api/v1/Job/'+localApplicationNumber)
 .then(function (data) {
  console.log('data from server is');
  console.log(data);
  data.data.message.forEach((data)=>{
 	 if(data.applicationID==localApplicationNumber){
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
										 console.log('all request sent to server');
										  let arr=[],arr1=[],arr2=[];
										result.data.message.forEach((data,i)=>{
								     //to filter jobs acc. to stages
								      if(data.status=='NotStarted')
								      {
								        arr.push(data);
								    }
										else if(data.status=='Ongoing')
										{
											arr1.push(data);
									}
									else if(data.status=='Completed'){
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
								 console.log('in handleJobFilter');
								 console.log('request is'+ data);
								//  let applicationRequest={
								// 	 value:data
								//  }
          Axios.get('/api/v1/Job/'+data)
          .then(function (data) {
						console.log(data.data.message);
            this.setState({jobData:data.data.message});
						console.log(this.state.jobData);
						this.setState({jobDetailArr:this.state.jobData[0]});
          }.bind(this))
          .catch(function (error) {
            console.log(error+"error in jobDetail for status");
          });
        }

//get job state from child Component
handleJobStages=(data)=>
{
 // this.state.jobState=data;
 this.setState({jobState:data});

	if(data=='ALL')
	{
		this.getjobDetails();
	}
	else {
		this.handleJobFilter(data);
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

		 if(data.status=='NotStarted')
		 {
			 arr.push(data);


	 }
	 else if(data.status=='Ongoing')
	 {
		 arr1.push(data);

 }
 else if(data.status=='Completed'){
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
else if (data=='NotStarted') {

	return <UpcomingJobs jobState={this.state.jobState} upcomingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else if (data=='OngoingJobs') {
	return <OngoingJobs jobState={this.state.jobState} ongoingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else  {
	return <CompletedJobs jobState={this.state.jobState} completedArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}

}

static get contextTypes() {
		return {
			socket:React.PropTypes.object.isRequired
		}
	}

myFunction=(msg)=>{
  // alert('hi');
  console.log('my function call after 2 seconds');
  let currentJobData=this.state.jobData;
  let currentUpcomingArr =this.state.upcomingArr;
  let currentAppData=this.state.jobDetailArr;
console.log('current upcoming data is');
console.log(currentUpcomingArr);
  // console.log(currentUpcomingArr);
  Axios.get('/api/v1/Job/')
  .then(function (data) {
   console.log('data from server is');
   console.log(data);
   data.data.message.forEach((data)=>{
    if(data.applicationID==msg){
      console.log(data);
      currentJobData.forEach((datas,i)=>{
        if(datas.applicationID==msg){
       var editData=currentJobData.splice(i,1,data);
       editData=null;
        }
      })

      // for all  jobs
      currentUpcomingArr.forEach((datas,i)=>{
        if(datas.applicationID==msg){
       var editDataupcoming=currentUpcomingArr.splice(i,1,data);
       editDataupcoming=null;
        }
      })

      console.log('currentUpcomingArr after initiate job is');
      console.log(currentUpcomingArr);
      console.log('current current Job data');
      console.log(currentJobData);
      //set the state here for individual application number -------------- later we ll do server side api for each application number
       this.setState({jobData:currentJobData,upcomingArr:currentUpcomingArr});
       if(currentAppData.applicationID==msg){
         this.setState({jobDetailArr:data});
       }
    }
   })
  }.bind(this))
  .catch(function (error) {
   console.log(error+"error in jobDetail for status");
  });
}
	componentDidMount=()=>{

		this.context.socket.on('initiateJobSocketWeb',(msg)=>{
      setTimeout(this.myFunction(msg), 2000);
			console.log('socket initiated here for JOb Inititation------------------');
				console.log(msg);
				// console.log('obj after assign value is');
				// console.log(newObj);


		// alert('i hc recv message');
		});
    this.context.socket.on('JobActivityMsgWeb',(msg)=>{
      // let currentJobData=this.state.jobData;
      // let currentUpcomingArr =this.state.upcomingArr;
      let currentAppData=this.state.jobDetailArr;
    console.log('current upcoming data is');
    // console.log(currentUpcomingArr);
      // console.log(currentUpcomingArr);
      Axios.get('/api/v1/Job/')
      .then(function (data) {
       console.log('data from server is');
       console.log(data);
       data.data.message.forEach((data)=>{
        if(data.applicationID==msg){
          console.log(data);
           if(currentAppData.applicationID==data.applicationID){
             this.setState({jobDetailArr:data});
           }
        }
       })
      }.bind(this))
      .catch(function (error) {
       console.log(error+"error in jobDetail for status");
      });


    })
    this.context.socket.on('JobCompletionMsgWeb',(msg)=>{
      let currentOngoingData=this.state.ongoingArr;
    	let currentCompleted=this.state.completedArr;
      let currentUpcomingArr=this.state.upcomingArr;
      let currentAppData=this.state.jobDetailArr;
      let currentJobData=this.state.jobData;
      // if(currentAppData.status=='Ongoing'){
      //   this.setState({jobDetailArr:currentOngoingData[0]});
      // }else{
      //     this.setState({jobDetailArr:currentUpcomingArr[0]});
      // }
    	// let currentJobData=this.state.jobData;
      console.log('current state of Checkbox is');
      // console.log(this.state.jobState);
      // if(currentAppData.status=='ALL' || this.state.jobState=='NotStarted'){
      //   this.setState({jobDetailArr:currentUpcomingArr[0]});
      // }else if(currentAppData.status=='Ongoing'){
      //     this.setState({jobDetailArr:currentOngoingData[0]});
      // }else if(currentAppData.status=='Completed'){
      //     this.setState({jobDetailArr:currentCompleted[0]});
      // }

      Axios.get('/api/v1/Job/')
      .then(function (data) {
       console.log('data from server is');
       console.log(data);
       data.data.message.forEach((data)=>{
        if(data.applicationID==msg){
          console.log(data);
          //  if(currentAppData.applicationID==data.applicationID){
          //    this.setState({jobDetailArr:data});
          //  }
          currentOngoingData.forEach((datas,i)=>{
        		if(datas.applicationID=msg){
        			var editData=currentOngoingData.splice(i,1);
                  editData=null;
        		}
        	})
          currentJobData.forEach((data,i)=>{
        		if(data.applicationID==msg){
        			var editData=currentJobData.splice(i,1);
                  editData=null;
        		}
        	})
          var newData=[data].concat(currentCompleted);
        	// currentCompleted.forEach((data,i)=>{
        	// 	if(data.applicationID==obj.applicationID){
        	// 		var editData=currentJobData.splice(i,1);
          //         editData=null;
        	// 	}
        	// })
        	this.setState({ongoingArr:currentOngoingData,completedArr:newData,jobData:currentJobData,jobDetailArr:currentJobData[0]});
          // this.setState({ongoingArrlen:currentOngoingData.length,completedArrlen:newData.length});

        }
       })
      }.bind(this))
      .catch(function (error) {
       console.log(error+"error in jobDetail for status");
      });


    });
	}

//to get no. of jobs and to render the upcoming jobs when loaded initially
componentWillMount=()=>
{
	this.getNumberOfJobs();
	let jobstatus='NotStarted';
	this.setState({jobState:jobstatus});
		this.handleJobFilter(jobstatus);
}
approvalData=(obj)=>{
	let currentOngoingData=this.state.ongoingArr;
	let currentUpcomingArr=this.state.upcomingArr;
	let currentJobData=this.state.jobData;
	Axios({
  method: 'patch',
  url: '/api/v1/Job/',
  data: obj
})
.then(function (data) {
  console.log('response from server');
	data.data.message.applicationActiveStatus=obj.applicationActiveStatus;
	data.data.message.status=obj.status;
	data.data.message.JobProgress=obj.JobProgress;
	let newdata=[data.data.message].concat(currentOngoingData);
	currentUpcomingArr.forEach((data,i)=>{
		if(data.applicationID==obj.applicationID){
			var editData=currentUpcomingArr.splice(i,1);
          editData=null;
		}
	})
	currentJobData.forEach((data,i)=>{
		if(data.applicationID==obj.applicationID){
			var editData=currentJobData.splice(i,1);
          editData=null;
		}
	})
  // this.setState({upcomingArrlen:currentUpcomingArr.length,ongoingArrlen:newdata.length});
	this.setState({ongoingArr:newdata,upcomingArr:currentUpcomingArr,jobData:currentJobData,jobDetailArr:currentJobData[0]});
  // this.setState({upcomingArrlen:currentUpcomingArr.length,ongoingArrlen:newdata.length});


}.bind(this))
.catch(function (error) {
  console.log(error+"error in jobDetail for status");
});
}

clickSearch=()=>{
	// alert('clicked');
	// let arr=[];
	this.state.jobData.forEach((data)=>{
		this.state.arr.push(data.applicationID);

	})
}
handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
		console.log('searchText is');
		console.log(searchText);
		// Axios.get('/api/v1/Job/')
	  // .then(function (data) {
	  //  console.log('data from server is');
	  //  console.log(data);
	  //  data.data.message.forEach((datas)=>{
	  // 	 if(datas.applicationID==searchText){
	  // 		 //set the state here for individual application number -------------- later we ll do server side api for each application number
	  // 		 this.setState({jobData:datas});
	  // 	 }
	  //  })
	  // }.bind(this))
	  // .catch(function (error) {
	  //  console.log(error+"error in jobDetail for status");
	  // });

  };

  // handleNewRequest = () => {
  //   this.setState({
  //     searchText: '',
  //   });
  // };

	render () {

		return (
<Grid columns={3} divided >
     <Grid.Row>
         <Grid.Column width={3} style={{background:'#CFE2F5 '}}>
             <AusnetServices handleJobStages={this.handleJobStages} upcomingArrlen={this.state.upcomingArrlen} ongoingArrlen={this.state.ongoingArrlen} completedArrlen={this.state.completedArrlen} Alllength={this.state.Alllength}/>
             <br></br>
         <Button  style={{marginLeft:'10',color:'#fff',backgroundColor:'#057EF7 '}}>Dialer</Button>
         </Grid.Column>

         <Grid.Column width={3} style={{background:'#ECE9E9 '}}>
					 <AutoComplete
			      floatingLabelText="Search Job Here"
			      filter={AutoComplete.fuzzyFilter}
						searchText={this.state.searchText}
						 onUpdateInput={this.handleUpdateInput}
						  onNewRequest={this.handleNewRequest}
			      dataSource={this.state.arr}
			      maxSearchResults={5}
						onTouchTap={this.clickSearch}
    			/>
						{/* <input type="text" placeholder="Search Jobs Here" style={{icon: 'search', iconPosition: 'left',width:'100%',height:30}} /> */}
            {this.jobFilter(this.state.jobState)}

         </Grid.Column>

         <Grid.Column width={10} style={{background:'#fff'}}>
<JobApplication  jobDetailArr={this.state.jobDetailArr} approvalData={this.approvalData}/>


         </Grid.Column>
     </Grid.Row>
</Grid>


		);
	}
}
