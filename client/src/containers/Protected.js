import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

export default function Protected(Component) {
	@inject('userStore')
	@observer
	class AuthenticatedComponent extends Component {
		constructor(props) {
			super(null);
			this.userStore = this.props.userStore
		}

		render() {
			const isAuthenticated = this.userStore.isAuthenticated;

			console.log(isAuthenticated);
			const authenticating = false;
			return (
				<div className='authComponent'>
					{isAuthenticated
						? <Component {...this.props} />
						: !authenticating && !isAuthenticated
								? <Redirect
										to={{
											pathname: '/login',
											state: { from: this.props.location }
										}}
									/>
								: null}
				</div>
			);
		}
	}
	return AuthenticatedComponent;
}
