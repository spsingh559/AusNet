import React from 'react';
import {Form,Label,Divider,List} from 'semantic-ui-react';
export default class CompletedJobs extends React.Component {

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
  console.log(this.props.completedArr);
  let arr=[];
	if(this.props.completedArr.length!=0){
  this.props.completedArr.forEach((data,i)=>{
		arr.push(<div key={i}>

			<List >
            <List.Item value={data.applicationID} onClick={this.handleClick} >

                    <List.Description as='a' >
                    Application Number:{data.applicationID }<br />
                    Status:{data.status }</List.Description>
                    <hr />
            </List.Item>

        </List>
		</div>);
  })}else{
		arr.push(<div key='one'>No Completed Job available </div>)
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
