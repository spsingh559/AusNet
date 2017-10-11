import React from 'react';
import {Form,Divider,List} from 'semantic-ui-react';
export default class OngoingJobs extends React.Component {
	constructor() {
    super();
    this.state = {
    appno:''
  };
}
 handleClick = (e,{value}) =>
 {
	 console.log (value);
	 this.state.appno=value ;
	 this.setState({ appno:this.state.appno});
	 console.log(this.state.appno);
	 this.props.getAppNoDetails(this.state.appno);
 }

	render () {
  console.log(this.props.ongoingArr);
  let arr=[];
	if(this.props.ongoingArr.length!=0){
  this.props.ongoingArr.forEach((data,i)=>{
		arr.push(<div key={i}>

			<List >
            <List.Item value={data.applicationID} onClick={this.handleClick} >

                    <List.Description as='a' >
                    Application number:{data.applicationID }<br />
                    Status:{data.status }</List.Description>
                    <hr />
            </List.Item>

        </List>
		</div>);
  })}else{
		arr.push(<div key='one'> No Ongoing Jobs available</div>);
	}
		return (

			<div>
	            <div style={{fontWeight:'bold',color:'#05A1DC ',height:30,backgroundColor:'#DCDCDC ',paddingTop:5}}>
	                {this.props.jobState}
	            </div>
	            <div>
	                {arr}
	            </div>
	        </div>
    );
  }
}
