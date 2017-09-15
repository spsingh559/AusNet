import React from 'react';
import {Divider} from 'semantic-ui-react';
import Profile from './CEOTprifile/profile.jsx';
import JobStages from './CEOTprifile/jobstages.jsx';
import Notifications from './CEOTprifile/notifications.jsx';
export default class AsunetServices extends React.Component {

	render () {
		return (
			<div >
        <Profile/>
 			 <br></br>
 			 <Divider horizontal>-</Divider>
 			 <JobStages getJobStages={this.props.handleJobStages} upcomingArrlen={this.props.upcomingArrlen} ongoingArrlen={this.props.ongoingArrlen} completedArrlen={this.props.completedArrlen} Alllength={this.props.Alllength}/>
 			 <br></br>
 			 <Divider horizontal>-</Divider>
 			 <Notifications/>
      </div>
    );
  }
}