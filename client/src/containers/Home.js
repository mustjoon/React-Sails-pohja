import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {withRouter} from "react-router-dom";
@withRouter
@inject('userStore')
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		
		return (
			<div className='page home'>
				asdasd
			</div>
		);
	}
}
