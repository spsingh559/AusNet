import React from 'react';
import {Divider} from 'semantic-ui-react';
import Profile from './CEOTprifile/profile.jsx';
import JobStages from './CEOTprifile/jobstages.jsx';
import Notifications from './CEOTprifile/notificationsLatest.jsx';
export default class AsunetServices extends React.Component {

	render () {
		return (
			<div >
       <Profile/>
             <br></br>
             <JobStages getJobStages={this.props.handleJobStages} upcomingArrlen={this.props.upcomingArrlen} ongoingArrlen={this.props.ongoingArrlen} completedArrlen={this.props.completedArrlen} Alllength={this.props.Alllength}/>
             <br /><br />
             <Notifications/>
             <br />
             <br />
     </div>
    );
  }
}
