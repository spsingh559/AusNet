import React from 'react';
import {Form, Divider,Search} from 'semantic-ui-react';
import OngoingJobs from './ongoingJobs.jsx';
import UpcomingJobs from './upcomingJobs.jsx';
import CompletedJobs from './completedJobs.jsx';
export default class JobList extends React.Component {

  constructor() {
    super();
    this.state = {
    data:'upcomingJobs',
    data1:'ongoingJobs',
    data2:'completedJobs'
  };
}
// componentDidMount=()=>{
//   this.context.socket.on('initiateJobSocketWeb', (msg) => {
//     console.log(msg);
//     alert('req reached here');
//     // Axios.get('/api/v1/Job/')
//     // .then(function (data) {
//     //  console.log('data from server is');
//     //  console.log(data);
//     //  data.data.message.forEach((data)=>{
//     // 	 if(data.applicationID==msg.applicationID){
//     // 		 //set the state here for individual application number -------------- later we ll do server side api for each application number
//     // 		 this.setState({jobDetailArr:data});
//     // 	 }
//     //  })
//     // }.bind(this))
//     // .catch(function (error) {
//     //  console.log(error+"error in jobDetail for status");
//     // });
//       });
// }

	render () {

		return (
			<div >

      <UpcomingJobs upcomingArr={this.props.upcomingArr} jobState={this.state.data} getAppNoDetails={this.props.getAppNoDetails}/>

      <OngoingJobs ongoingArr={this.props.ongoingArr} jobState={this.state.data1} getAppNoDetails={this.props.getAppNoDetails}/>

      <CompletedJobs completedArr={this.props.completedArr} jobState={this.state.data2} getAppNoDetails={this.props.getAppNoDetails}/>

      </div>
    );
  }
}
