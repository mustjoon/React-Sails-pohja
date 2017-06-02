import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

export default function DataWrapper(Component) {
	class DataFetcher extends Component {
		constructor(props) {
			super(props);
			this.store = this.props.store.appState;
		}

		componentDidMount() {
			let pathname = this.props.match.url;
			let id = this.props.match.id ? this.props.match.id : null;
			this.store.fetchData(pathname, id);
		}

		componentWillUnmount() {
			this.store.clearItems();
		}

		render() {
			return <Component {...this.props} />;
		}
	}
	return DataFetcher;
}
