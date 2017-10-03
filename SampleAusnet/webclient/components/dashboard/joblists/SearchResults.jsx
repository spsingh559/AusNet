import React from 'react';
import {List} from 'semantic-ui-react';
export default class SearchResults extends React.Component {

constructor() {
   super();
   this.state = {

};
}

   render () {
console.log(this.props.searchData);
       return (
           <div>
       <List >
       <List.Item value={this.props.searchData.applicationID}>

          <List.Header as='a' >Application number:{this.props.searchData.applicationID }</List.Header>
           <List.Description as='a' >Status:{this.props.searchData.status }</List.Description>
           <br></br>

      </List.Item>

      </List>
     </div>
   );
 }
}
