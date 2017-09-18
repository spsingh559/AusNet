import React from 'react';
import {Button,
        Container,
        Icon,
        Label,
        Input,
        Grid,
        Image,
        }
        from 'semantic-ui-react';
        import { Link } from 'react-router';
// import './style/style.css';
import Axios from 'axios';
export default class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
  this.handleUsername=this.handleUsername.bind(this);
  this.handlePassword=this.handlePassword.bind(this);
  this.handleClick = this.handleClick.bind(this);
 }
handleUsername(e){
this.setState({ username: e.target.value });
//console.log("gfgfffffffff"+this.state.username);
}
handlePassword(e){
  this.setState({ password: e.target.value });
}
handleClick() {
console.log("gfgfffffffff"+this.state.username);
var data1=[
  this.state.username,
  this.state.password
];
console.log(data1+"jjjjjjjjjjjjjjjjjjjjj");
  Axios({
                 method:'post',
                   url:'/api/v1/Employee/'+[data1],
             })
        .then((result) => {
                 console.log('Login details connected to server for post');
            console.log(result);
                     console.log(data1);
         })
         .catch((error) => {
                console.log(error);
                                console.log(error+"error in Login data for post");
         });
 }
render() {
    return (
          <div class="row" style= {{backgroundImage: "url('https://www.fool.com.au/wp-content/uploads/2016/03/pylons-933274_1920.jpg')",
            height:'1300px'
          }}>
          <div>
           <Image src='https://www.ausnetservices.com.au/-/media/Images/AusNet/Common/logo_ausnet.ashx?la=en&hash=52AA8B8D08166A07F90AE9667C208C23702A3AF5'
              centered
              style={{width:'100px',height:'100px', marginBottom:'50px'}}/>
          </div>
          <Grid.Row columns={8}>
          <Grid.Column style={{textAlign: 'center',marginTop:'50px'}}>
          <Label as='a' color='teal' size='large'>
              Please Enter your Credentials</Label><br/><br/>
            <Input icon='user' iconPosition='left' value={this.state.username} onChange = {this.handleUsername}
          placeholder=' Username' /><br/><br/>
        <Input icon='key' type='password' iconPosition='left' value={this.state.password} onChange = {this.handlePassword}
            placeholder=' Password' />
        <br/><br/>
      <a href="#" color='black'>Forgot Password</a><br/><br/>
               <Link to="/dashboard">
               <Button type='submit' color='teal' size='medium' onClick= {this.handleClick}>Submit</Button>
               </Link>
            </Grid.Column>
            </Grid.Row>
         </div>
    );
  }
}
