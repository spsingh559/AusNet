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
    if(this.props.index==0){
      return(
        <List style={{backgroundColor:'white'}}>
  			<List.Item  onClick={this.handleClick} >

  					<List.Header as='a' >Application No:{this.props.applicationID }</List.Header>
  					<List.Description as='a' >Status:{this.props.status }</List.Description>
  					<br></br>
  			</List.Item>
  		</List>
      )
    }else{
      return(
        <List style={{backgroundColor:this.state.backgroundStyle}}>
  			<List.Item  onClick={this.handleClick} >

  					<List.Header as='a' >Application No:{this.props.applicationID }</List.Header>
  					<List.Description as='a' >Status:{this.props.status }</List.Description>
  					<br></br>
  			</List.Item>
  		</List>
      )
    }

  }
}
