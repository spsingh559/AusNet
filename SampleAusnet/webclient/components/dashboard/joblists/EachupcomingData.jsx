import React from 'react';
import {Form,Divider,List,Button} from 'semantic-ui-react';
export default class EachupcomingData extends React.Component{
  state={
    backgroundStyle:''
  }
  handleClick=()=>{
    // alert('clicked');
    this.setState({backgroundStyle:'white'});
    this.props.getAppNoDetails(this.props.applicationID);

  }

  render(){
    console.log('hey i am in EachupcomingData comp----------------------------');

      return(
        <List style={{backgroundColor:this.state.backgroundStyle}}>
  			<List.Item  onClick={this.handleClick} >

          <List.Description as='a' >
          Application Number:{this.props.applicationID }<br />
          Status:{this.props.applicationActiveStatus?'Awaiting Approval':'Not Started' }</List.Description>
          <hr />
  			</List.Item>
  		</List>
      )


  }
}
