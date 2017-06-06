import React, { Component } from 'react';
import { Route, Link,Redirect,withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

import Emoji from './Emoji';
import Launch from './Launch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import SubPage from './SubPage';
import SubItem from './SubItem';
import Login from './Login';


import Protected from './Protected';

@withRouter
@inject('appState')
@inject('userStore')
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.appState = props.appState;
	}
	componentDidMount() {
	}
	authenticate(e) {
		if (e) e.preventDefault();
		this.appState.authenticate();
	}
	render() {
		const {
			testval
		} = this.appState;

		const isAuthenticated = this.props.userStore.isAuthenticated;

		return (
			<div className='wrapper'>
				{/*<DevTools />*/}
				<Header />

				<Route
					exact
					path='/'
					component={Launch}
				/>

				<PrivateRoute
					isAuthenticated={isAuthenticated}
					path='/home'
					component={Home}
				/>
				<PrivateRoute
					isAuthenticated={isAuthenticated}
					path='/emoji'
					component={Emoji}
				/>
				<Route
					path='/auth/:method'
					component={Login}
				/>
				<Footer/>
			</div>
		);
	}
}

const PrivateRoute = ({ component: Component, ...rest }) => (


  <Route {...rest} render={props => (
    rest.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

