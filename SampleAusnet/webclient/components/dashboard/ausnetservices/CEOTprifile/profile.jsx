import React from 'react';
import {Image} from 'semantic-ui-react';
export default class Profile extends React.Component {

	render () {
		return (
			<div >
        <Image src='https://www.ausnetservices.com.au/-/media/Images/AusNet/Common/logo_ausnet.ashx?la=en&hash=52AA8B8D08166A07F90AE9667C208C23702A3AF5'  centered   style={{width:'100px',height:'90px'}}/>
        <br></br>
        <br></br>
         <Image src='http://old.theagencypartners.com.au/wp-content/uploads/2016/05/300x300-15-400x400.jpg'  centered shape='circular'  style={{width:'100px',height:'90px'}}/>
         <center>Jacob<br></br>Senior Controller</center>

      </div>
    );
  }
}
