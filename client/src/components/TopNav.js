import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import ActiveLink from './ui/Activelink';

@inject('appState')
@observer
export default class TopNav extends Component {
	constructor(props) {
		super(props);
		this.store = props.appState;
	}

	authenticate(e) {
		if (e) e.preventDefault();
		this.props.store.authenticate();
	}

	render() {
		const { authenticated, authenticating } = this.store;
		return (
			<div>HellO!</div>
		);
	}
}
