import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
export default class JobProgressChild extends React.Component {

  state={
    dynamicValue:0
  }
  render() {
    const stepIndex = 2;
    // const contentStyle = {margin: '0 16px'};
    console.log('job progress data for each application')
    // console.log(this.props.data);
    let arr=[];
    let arr1=[];
    if(this.props.data!=undefined || this.props.data!=null){
      console.log('inside execution part');
      let count=0;
    this.props.data.forEach((data,i)=>{
      // console.log(data);
      // console.log(i);

      if(i<=4){
      arr.push(<Step key={i}><StepLabel>{data.name.slice(0, 15)} <br /> {data.time}</StepLabel></Step>);
    }else{

    arr1.push(<Step key={i}><StepLabel>{data.name.slice(0, 15)} <br /> {data.time}</StepLabel></Step>);
    }
    if(data.status==true){
      count++;
    }
  });
  console.log('count of true is'+ count);
let firstIndex;
let secondIndex;
if(count==0){
  firstIndex=-1;
  secondIndex=-1;
}else{
  if(count + this.state.dynamicValue>4){
    secondIndex=count + this.state.dynamicValue-5;
    firstIndex=5;
  }else {
    firstIndex=count+this.state.dynamicValue;
    }
  }


    return (
      <div style={{width: '100%', maxWidth: '100%', margin: 'auto'}}>
        <Stepper activeStep={firstIndex}>
          {/* <Step>
          {this.props.data.forEach((datas,i)=>{

              <StepLabel>
                datas.name
              </StepLabel>

          })}
          </Step> */}

          {arr}

        </Stepper>

        <Stepper activeStep={secondIndex}>

          {arr1}

        </Stepper>
        </div>
    );
  }else{
      return null;
    }
  }
}

// import React from 'react';
// import {Form,Divider,List,Button} from 'semantic-ui-react';
// import { Checkbox,Grid,Container } from 'semantic-ui-react'
//
// export default class JobProgressChild extends React.Component {
//
// 	constructor() {
//     super();
//     this.state = {
//
//   };
// }
// render () {
// return (
//
//     <div>
//       <Container>
//         <Grid columns={1} divided >
//       <Grid.Row stretched>
//            <Grid.Column width={3}>
//          <Checkbox label={<label>Job Initiated</label>} />
//           </Grid.Column>
//            <Grid.Column width={3}>
//            <Checkbox label={<label>CEOT Approval</label>} />
//             </Grid.Column>
//              <Grid.Column width={3}>
//              <Checkbox label={<label>Interuption Time Started</label>} />
//               </Grid.Column>
//                <Grid.Column width={3}>
//                <Checkbox label={<label>Isolation and Earthing Done</label>} />
//                 </Grid.Column>
//                  <Grid.Column width={3}>
//                  <Checkbox label={<label>Issue Permit</label>} />
//    		 </Grid.Column>
//      </Grid.Row>
//      <Grid.Row stretched>
//       <Grid.Column width={3}>
//                 <Checkbox label={<label>Work Started</label>} />
//                  </Grid.Column>
//                   <Grid.Column width={3}>
//                 <Checkbox label={<label>Work Completed</label>} />
//                  </Grid.Column>
//                    <Grid.Column width={3}>
//                   <Checkbox label={<label>Cancel Permit</label>} />
//                    </Grid.Column>
//                      <Grid.Column width={3}>
//                     <Checkbox label={<label>Isolation and Earthing Removed</label>} />
//                      </Grid.Column>
//                        <Grid.Column width={3}>
//                       <Checkbox label={<label>Interruption Time Ended</label>} />
//                        </Grid.Column>
//       </Grid.Row>
//       </Grid>
//     </Container>
//     </div>
//   );
// }
// }
