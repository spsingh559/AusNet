import React from 'react';
import {Button,Container,Grid,Search, Header, Icon, Modal,Divider} from 'semantic-ui-react';
import AutoComplete from 'material-ui/AutoComplete';
import AusnetServices from './ausnetservices/ausnetservices.jsx';
import JobList from './joblists/joblist.jsx';
import OngoingJobs from './joblists/ongoingJobs.jsx';
import UpcomingJobs from './joblists/upcomingJobs.jsx';
import CompletedJobs from './joblists/completedJobs.jsx';
import JobApplication from './jobapplication/jobApplication.jsx'
import Axios from 'axios';
import SearchResults from './joblists/SearchResults.jsx';
//import Config from '../../../config/url';

const fruit = [
  '#339671', '#122390', '#21391',
  '#09123', '#90234u092', '#47389534', '#23843', '#3798423'];


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
				jobDetailArr:[],
        applarr:[],
        searchText: '',
        flag:0,
        modalOpen: false,
        pauseData:''

	};

}
//to get job  Details of a particular application number
getAppNoDetails=(data)=>
{
	this.getJobProfile(data);

}

// api function to get job  Details of a particular application number
getJobProfile=(localApplicationNumber)=>{
	console.log('api call for each application from client and applicationID is'+localApplicationNumber);
  localApplicationNumber = localApplicationNumber.substring(1);
 Axios.get('/api/v1/Job/applicationID/'+localApplicationNumber)
 .then(function (data) {
   this.setState({jobDetailArr:data.data.message[0]});
 }.bind(this))
 .catch(function (error) {
  console.log(error+"error in getting particular applicationID");
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
                  this.setState({flag:0});
          // Axios.get('/api/v1/Job/status/'+data)
          // .then(function (data) {
          //
          //   this.setState({jobData:data.data.message});
          //   if(data.data.message.length!=0){
					// 	this.setState({jobDetailArr:this.state.jobData[0]});
          // }
          //
          // }.bind(this))
          // .catch(function (error) {
          //   console.log(error+"error in getting data from filter");
          // });
          Axios.get('/api/v1/Job/status/'+data)
      .then(function (data) {
                     console.log(data.data.message);
        this.setState({jobData:data.data.message});
                     console.log(this.state.jobData);
                      if(data.data.message.length==0){
                        this.setState({jobDetailArr:[]})
                    }else{
                    this.setState({jobDetailArr:this.state.jobData[0]})
                  };
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
    this.setState({flag:0});
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
{console.log('data is'+data);
  if(this.state.flag==1)
   {
return <SearchResults searchData={this.state.jobDetailArr}/>
   }
   else {
if(data=='ALL'){

	return <JobList jobState={this.state.jobState}  upcomingArr={this.state.upcomingArr} ongoingArr={this.state.ongoingArr} completedArr={this.state.completedArr} getAppNoDetails={this.getAppNoDetails}/>
}
else if (data=='NotStarted') {

	return <UpcomingJobs jobState={this.state.jobState} upcomingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else if (data=='Ongoing') {
	return <OngoingJobs jobState={this.state.jobState} ongoingArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
else  {
	return <CompletedJobs jobState={this.state.jobState} completedArr={this.state.jobData} getAppNoDetails={this.getAppNoDetails}/>
}
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
  console.log('id reached here----------- is'+ msg);
  let currentJobData=this.state.jobData;
  let currentUpcomingArr =this.state.upcomingArr;
  let currentAppData=this.state.jobDetailArr;
  let applicationID = msg.substring(1);
  Axios.get('/api/v1/Job/applicationID/'+applicationID)
  .then(function (data) {
        currentJobData.forEach((datas,i)=>{
        if(datas.applicationID==msg){
       var editData=currentJobData.splice(i,1,data.data.message[0]);
       editData=null;
        }
      })

      currentUpcomingArr.forEach((datas,i)=>{
        if(datas.applicationID==msg){
       var editDataupcoming=currentUpcomingArr.splice(i,1,data.data.message[0]);
       editDataupcoming=null;
        }
      })

       this.setState({jobData:currentJobData,upcomingArr:currentUpcomingArr});
       if(currentAppData.applicationID==msg){
         this.setState({jobDetailArr:data.data.message[0]});
       }
  }.bind(this))
  .catch(function (error) {
   console.log(error+"error in getting particular applicationID data");
  });
}
	componentDidMount=()=>{

		this.context.socket.on('initiateJobSocketWeb',(msg)=>{
      setTimeout(this.myFunction(msg), 2000);
			console.log('socket initiated here for JOb Inititation------------------');
				console.log(msg);
		});

    this.context.socket.on('JobActivityMsgWeb',(msg)=>{
      let currentAppData=this.state.jobDetailArr;
      console.log('current upcoming data is');
      let applicationID=msg.substring(1);
      Axios.get('/api/v1/Job/applicationID/'+applicationID)
      .then(function (data) {
         console.log('data from server is');
         console.log(data);
         console.log(data.data.message);
           if(currentAppData.applicationID==msg){
             this.setState({jobDetailArr:data.data.message[0]});
           }
      }.bind(this))
      .catch(function (error) {
       console.log(error+"error in getting particular applicationID in JobActivityMsgWeb socket");
      });
    })

    this.context.socket.on('JobCompletionMsgWeb',(msg)=>{
      let currentOngoingData=this.state.ongoingArr;
    	let currentCompleted=this.state.completedArr;
      let currentUpcomingArr=this.state.upcomingArr;
      let currentAppData=this.state.jobDetailArr;
      let currentJobData=this.state.jobData;
      let currentOngoingArrLength=this.state.ongoingArrlen;
      let currentCompletedDataLength=this.state.completedArrlen;

      currentOngoingData.forEach((datas,i)=>{
        if(datas.applicationID==msg){
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

      if(currentJobData.length==0){
        this.setState({jobDetailArr:[]})
    }else{
    this.setState({jobDetailArr:currentJobData[0]})
    };

    this.setState({ongoingArrlen:currentOngoingArrLength-1,completedArrlen:currentCompletedDataLength+1});
    this.setState({ongoingArr:currentOngoingData,jobData:currentJobData});



      let applicationID=msg.substring(1);
      Axios.get('/api/v1/Job/applicationID/'+applicationID)
      .then(function (data) {
       console.log('data from server is');
       console.log(data);
      var newData=[data.data.message[0]].concat(currentCompleted);
    //   if(newData.length==0){
    //     this.setState({jobDetailArr:[]})
    // }else{
    // this.setState({jobDetailArr:newData[0]})
    // };

    // if(currentOngoingData.length==0){
    //   this.setState({jobDetailArr:[]})
    // }else{
    // this.setState({jobDetailArr:currentOngoingData[0]})
    // };
      this.setState({completedArr:newData});
      }.bind(this))
      .catch(function (error) {
       console.log(error+"error in getting particular applicationID in JobCompletionMsgWeb socket");
      });
    });

    //Paused JOb

    this.context.socket.on('InitiateJobPauseNotificationWeb',(msg)=>{

      console.log('socket initiated here for notification-------------------');
        console.log(msg)
        // var s = 'MyLongString:StringIWant;';
        var arrStr = msg.split(/[,]/);
        this.setState({pauseData:arrStr});
        // let obj={
        //   id:Date.now(),
        //   "applicationNumber": arrStr[0],
        //   "message":arrStr[1],
        //   "start": arrStr[2],
        // }

        this.setState({modalOpen:true});

        // let  newdata=[obj].concat(this.state.users)
        //  this.setState({users:newdata});
        // //  console.log(users);
        // // this.setState({users:newdata});
        // console.log(arrStr);
    });

	}

  handleClose = () => this.setState({ modalOpen: false });

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
  let currentUpcomingArrLength=this.state.upcomingArrlen;
  let currentOngoingDataLength=this.state.ongoingArrlen;

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

  if(currentJobData.length==0){
    this.setState({jobDetailArr:[]})
}else{
this.setState({jobDetailArr:currentJobData[0]})
};

  this.setState({upcomingArrlen:currentUpcomingArrLength-1,ongoingArrlen:currentOngoingDataLength+1});
  this.setState({upcomingArr:currentUpcomingArr,jobData:currentJobData});

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
	this.setState({ongoingArr:newdata});
  // this.setState({upcomingArrlen:currentUpcomingArr.length,ongoingArrlen:newdata.length});
//   if(newdata.length==0){
//     this.setState({jobDetailArr:[]})
// }else{
// this.setState({jobDetailArr:newdata[0]})
// };

// if(currentUpcomingArr.length==0){
//   this.setState({jobDetailArr:[]})
// }else{
// this.setState({jobDetailArr:currentUpcomingArr[0]})
// };

  }.bind(this))
  .catch(function (error) {
  console.log(error+"error in update api call for approval data");
});
}

handleUpdateInput = (searchText) => {
  console.log('searchText is'+ searchText);
   this.state.searchText=searchText;
    this.setState({
        searchText: this.state.searchText,
    });
    if(this.state.searchText.length==7)
    {
        this.setState({flag:1});
        console.log(this.state.flag);
        let applicationID=searchText.substring(1);
        Axios.get('api/v1/Job/applicationID/'+applicationID)
        .then(function (data) {
        console.log(data.data.message[0]);
        this.setState({jobDetailArr:data.data.message[0]})
        }.bind(this))
        .catch(function (error) {
        console.log(error+"error in searching application for particular ID");
        });
            }
};

handleNewRequest = () => {
    this.setState({
        searchText: '',
    });
};

searchApplication=()=>{
this.state.applarr=[];
console.log(this.state.jobState);
if(this.state.jobState=='ALL')
{
   this.state.ongoingArr.forEach((data)=>{
           this.state.applarr.push(data.applicationID);
       });
       this.state.upcomingArr.forEach((data)=>{
               this.state.applarr.push(data.applicationID);
           });
           this.state.completedArr.forEach((data)=>{
                   this.state.applarr.push(data.applicationID);
               });
}
else {
   this.state.jobData.forEach((data)=>{
           this.state.applarr.push(data.applicationID);
       });
}
this.setState({applarr:this.state.applarr})
}


	render () {

		return (
<Grid columns={3} divided >
     <Grid.Row>
         <Grid.Column width={3} style={{background:'#CFE2F5 '}}>
             <AusnetServices handleJobStages={this.handleJobStages} upcomingArrlen={this.state.upcomingArrlen} ongoingArrlen={this.state.ongoingArrlen} completedArrlen={this.state.completedArrlen} Alllength={this.state.Alllength}/>
             <br></br>
         <Button primary id='dialer'>Dialer</Button>
         </Grid.Column>

         <Grid.Column width={3} style={{background:'#ECE9E9 '}}>
           <AutoComplete
                             hintText="Search"
                   onUpdateInput={this.handleUpdateInput}
                   onNewRequest={this.handleNezwRequest}
                   onTouchTap={this.searchApplication}
                             dataSource={this.state.applarr}
                                 filter={AutoComplete.fuzzyFilter}
       />
    <br />
            {this.jobFilter(this.state.jobState)}

         </Grid.Column>

         {/* <Grid.Column width={10} style={{background:'#fff'}}>
           <JobApplication  jobDetailArr={this.state.jobDetailArr} approvalData={this.approvalData}/>
         </Grid.Column> */}
         <Grid.Column width={10} style={{background:'#fff'}}>


          { this.state.jobDetailArr.length==0?
           <div id="noJobs">
            <Divider horizontal >No jobs available</Divider>
           </div> :
          <JobApplication  jobDetailArr={this.state.jobDetailArr}
                           approvalData={this.approvalData}/>
        }

        </Grid.Column>
     </Grid.Row>
     <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='warning circle' content='Pause Job Alert' />

        <Modal.Content>
          <h3>{this.state.pauseData[1]}</h3>
          <h4>Application Number: {this.state.pauseData[0]}</h4>
          <h4>Time : {this.state.pauseData[2]}</h4>
          </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
</Grid>


		);
	}
}
