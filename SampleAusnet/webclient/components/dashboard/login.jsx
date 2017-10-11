import React from 'react';
import {Button,
Container,
Input,
Grid,
Image,
Segment
}
from 'semantic-ui-react';
import { Link } from 'react-router';
import Axios from 'axios';
export default class Login extends React.Component {
constructor(props){
super(props);
this.state={
Id:'',
password:''
}
this.handleUsername=this.handleUsername.bind(this);
this.handlePassword=this.handlePassword.bind(this);
this.handleClick = this.handleClick.bind(this);
}
handleUsername(e){
this.setState({ Id: e.target.value });
}
handlePassword(e){
this.setState({ password: e.target.value });
}
static get contextTypes() {
return {
socket:React.PropTypes.object.isRequired,
router: React.PropTypes.object.isRequired
}
}
handleClick(e) {
let data={ID:this.state.Id,password:this.state.password};
Axios({
method:'post',
url:'/api/v1/Employee/',
data:data
})
.then((data1) => {
console.log('Login details connected to server for post');
console.log(data1.data.message);
if(data1.data.message=='success'){
this.context.router.push('/dashboard');
alert('Successfully logged in!!!');
}else{
// this.context.router.push('/');
//do validation here for time being
alert('Please enter valid Credentials!!!');
}
console.log(data1);
})
.catch((error) => {
console.log(error);
console.log(error+"error in Login data for post");
});
}
render() {
return (
<div className="background">
  <div className='seg'>
    <Segment raised secondary >
    <div id='logo'>
      <Image src='../images/logo.png' />
    </div>
    <Grid.Row columns={8}>
      <Grid.Column id='input'>
        <h5>
        Please enter your credentials
        </h5><br/><br/>
        <Input id='ip1' value={this.state.username} onChange = {this.handleUsername}
        placeholder=' Username'/><br/><br/>
        <Input id='ip1' type='password' value={this.state.password} onChange = {this.handlePassword}
        placeholder=' Password' width='200px'/>
        <br/><br/>
        <a id='forgot' href="#">Forgot Password</a><br/><br/>
        <Button  type='submit' primary size='medium' onClick= {this.handleClick} onEnter={this.handleClick}>Login</Button>
      </Grid.Column>
    </Grid.Row>
    </Segment>
  </div>
</div>
);
}
}



// import React from 'react';
// import {Button,
// Container,
// Input,
// Grid,
// Image,
// Segment
// }
// from 'semantic-ui-react';
// import { Link } from 'react-router';
// // import './style/style.css';
// import Axios from 'axios';
// export default class Login extends React.Component {
// constructor(props){
// super(props);
// this.state={
// Id:'',
// password:''
// }
// this.handleUsername=this.handleUsername.bind(this);
// this.handlePassword=this.handlePassword.bind(this);
// this.handleClick = this.handleClick.bind(this);
// }
// handleUsername(e){
// this.setState({ Id: e.target.value });
// }
// handlePassword(e){
// this.setState({ password: e.target.value });
// }
// static get contextTypes() {
// return {
// socket:React.PropTypes.object.isRequired,
// router: React.PropTypes.object.isRequired
// }
// }
// handleClick(e) {
// let data={Id:this.state.Id,pwd:this.state.password};
// Axios({
// method:'post',
// url:'/api/v1/Employee/',
// data:data
// })
// .then((data1) => {
// console.log('Login details connected to server for post');
// if(data1.data.message=='succes'){
// this.context.router.push('/dashboard');
// alert('Successfully logged in!!!');
// }else{
// // this.context.router.push('/');
// //do validation here for time being
// alert('Please enter valid Credentials!!!');
// }
// console.log(data1);
// })
// .catch((error) => {
// console.log(error);
// console.log(error+"error in Login data for post");
// });
// }
// render() {
// return (
// <div className="background">
//   <div className='seg'>
//     <Segment raised secondary >
//     <div id='logo'>
//       <Image src='../images/logo.png' />
//     </div>
//     <Grid.Row columns={8}>
//       <Grid.Column id='input'>
//         <h5>
//         Please enter your credentials
//         </h5><br/><br/>
//         <Input id='ip1' value={this.state.username} onChange = {this.handleUsername}
//         placeholder=' Username'/><br/><br/>
//         <Input id='ip1' type='password' value={this.state.password} onChange = {this.handlePassword}
//         placeholder=' Password' width='200px'/>
//         <br/><br/>
//         <a id='forgot' href="#">Forgot Password</a><br/><br/>
//         <Button  type='submit' primary size='medium' onClick= {this.handleClick} onEnter={this.handleClick}>Login</Button>
//       </Grid.Column>
//     </Grid.Row>
//     </Segment>
//   </div>
//
// </div>
// );
// }
// }
//
// // import React from 'react';
// // import {Button,
// // Container,
// // Input,
// // Grid,
// // Image,
// // Segment
// // }
// // from 'semantic-ui-react';
// // import { Link } from 'react-router';
// // // import './style/style.css';
// // import Axios from 'axios';
// // export default class Login extends React.Component {
// // constructor(props){
// // super(props);
// // this.state={
// // Id:'',
// // password:''
// // }
// // this.handleUsername=this.handleUsername.bind(this);
// // this.handlePassword=this.handlePassword.bind(this);
// // this.handleClick = this.handleClick.bind(this);
// // }
// // handleUsername(e){
// // this.setState({ Id: e.target.value });
// // }
// // handlePassword(e){
// // this.setState({ password: e.target.value });
// // }
// // static get contextTypes() {
// // return {
// // socket:React.PropTypes.object.isRequired,
// // router: React.PropTypes.object.isRequired
// // }
// // }
// // handleClick(e) {
// // let data={Id:this.state.Id,pwd:this.state.password};
// // Axios({
// // method:'post',
// // url:'/api/v1/Employee/',
// // data:data
// // })
// // .then((data1) => {
// // console.log('Login details connected to server for post');
// // if(data1.data.message=='succes'){
// // this.context.router.push('/dashboard');
// // alert('Successfully logged in!!!');
// // }else{
// // // this.context.router.push('/');
// // //do validation here for time being
// // alert('Please enter valid Credentials!!!');
// // }
// // console.log(data1);
// // })
// // .catch((error) => {
// // console.log(error);
// // console.log(error+"error in Login data for post");
// // });
// // }
// // render() {
// // return (
// // <div className="background">
// //   <div className='seg'>
// //     <Segment raised secondary >
// //     <div id='logo'>
// //       <Image src='../images/logo.png' />
// //     </div>
// //     <Grid.Row columns={8}>
// //       <Grid.Column id='input'>
// //         <h5>
// //         Please enter your credentials
// //         </h5><br/><br/>
// //         <Input id='ip1' value={this.state.username} onChange = {this.handleUsername}
// //         placeholder=' Username'/><br/><br/>
// //         <Input id='ip1' type='password' value={this.state.password} onChange = {this.handlePassword}
// //         placeholder=' Password' width='200px'/>
// //         <br/><br/>
// //         <a id='forgot' href="#">Forgot Password</a><br/><br/>
// //         <Button  type='submit' primary size='medium' onClick= {this.handleClick} onEnter={this.handleClick}>Login</Button>
// //       </Grid.Column>
// //     </Grid.Row>
// //     </Segment>
// //   </div>
// //
// // </div>
// // );
// // }
// // }
