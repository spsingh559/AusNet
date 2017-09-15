import React from 'react';
import {Form,Radio,Label} from 'semantic-ui-react';
export default class JobStages extends React.Component {

  state = {}
    handleChange = (e, { value }) => {
      this.setState({ value });
       this.props.getJobStages(value);

     }


	render () {
		return (
        <Form>
       <Form.Field>
        JOBS <b>{this.state.value}</b>
       </Form.Field>
       <Form.Field>
         <Radio
           label='ALL'
           name='radioGroup'
           value='ALL'
          checked={this.state.value === 'ALL'}
           onChange={this.handleChange}

         />
  <Label circular style={{float:'right'}}>{this.props.Alllength}</Label>
       </Form.Field>
       <Form.Field>
         <Radio
           label='UpcomingJobs'
           name='radioGroup'
           value='UpcomingJobs'
          checked={this.state.value === 'UpcomingJobs'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.upcomingArrlen}</Label>
       </Form.Field>
       <Form.Field>
         <Radio
           label='OngoingJobs'
           name='radioGroup'
           value='OngoingJobs'
           checked={this.state.value === 'OngoingJobs'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.ongoingArrlen}</Label>
       </Form.Field>
       <Form.Field>
         <Radio
           label='CompletedJobs'
           name='radioGroup'
           value='CompletedJobs'
           checked={this.state.value === 'CompletedJobs'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.completedArrlen}</Label>
       </Form.Field>
     </Form>

    );
  }
}
