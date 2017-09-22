import React from 'react';
import {Form,Divider,List,Button} from 'semantic-ui-react';
import JobDetail from './jobDetail.jsx';
import JobProgress from './jobProgress.jsx';
export default class JobApplication extends React.Component {

	constructor() {
    super();
    this.state = {

  };
}
render () {
return (

    <div>
      <JobDetail  jobDetailArr={this.props.jobDetailArr}/>
<Divider horizontal>-</Divider>
      <JobProgress jobDetailArr={this.props.jobDetailArr}/>
    </div>
  );
}
}
