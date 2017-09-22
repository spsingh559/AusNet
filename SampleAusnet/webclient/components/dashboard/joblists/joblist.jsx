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
