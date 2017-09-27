import React from 'react';
import {Form,Checkbox,Label} from 'semantic-ui-react';
export default class JobStages extends React.Component {

  state = {}
    handleChange = (e, { value }) => {
      this.setState({ value });
       this.props.getJobStages(value);

     }


	render () {
		return (
        <Form style={{marginLeft:10}}>
       <Form.Field style={{fontWeight:'bold',marginLeft:10}}>
        Jobs <b>{this.state.value}</b>
       </Form.Field>
       <Form.Field>
         <Checkbox
           label='ALL'
           name='radioGroup'
           value='ALL'
          checked={this.state.value === 'ALL'}
           onChange={this.handleChange}

         />
  <Label circular style={{float:'right'}}>{this.props.Alllength}</Label>
       </Form.Field>
       <Form.Field>
         <Checkbox
           label='UpcomingJobs'
           name='radioGroup'
           value='NotStarted'
          checked={this.state.value === 'NotStarted'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.upcomingArrlen}</Label>
       </Form.Field>
       <Form.Field>
         <Checkbox
           label='OngoingJobs'
           name='radioGroup'
           value='Ongoing'
           checked={this.state.value === 'Ongoing'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.ongoingArrlen}</Label>
       </Form.Field>
       <Form.Field>
         <Checkbox
           label='CompletedJobs'
           name='radioGroup'
           value='Completed'
           checked={this.state.value === 'Completed'}
           onChange={this.handleChange}
         />
          <Label circular style={{float:'right'}}>{this.props.completedArrlen}</Label>
       </Form.Field>
     </Form>

    );
  }
}
