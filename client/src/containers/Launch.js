import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

@withRouter
@inject('userStore')
@observer
class Launch extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		
		return (
			<div className='page home'>
				<Link to='/auth/login'>Login</Link>
				<Link to='/auth/register'>Register</Link>	
				
			</div>
		);
	}
}


export default Launch