// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Router, Route, hashHistory} from 'react-router';
//
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
//
// import Dashboard from './components/dashboard';
// import ContextComponent from './context.jsx';
//
//
// ReactDOM.render(
// 	<ContextComponent>
// 	<MuiThemeProvider>
// 		<Router history={hashHistory}>
// 			<Route path="/" component={Dashboard} />
// 		</Router>
// 	</MuiThemeProvider>
// 	</ContextComponent>,
//   	document.getElementById('mountapp')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Dashboard from './components/dashboard/dashboard';
import Login from './components/dashboard/login';

import ContextComponent from './context.jsx';
ReactDOM.render(
    <ContextComponent>
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={Login} />
						<Route path='/dashboard' component={Dashboard}/>
        </Router>
    </MuiThemeProvider>
    </ContextComponent>,
    document.getElementById('mountapp')
);
