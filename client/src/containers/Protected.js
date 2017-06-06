import React, { Component } from 'react';
import { Route,Redirect,withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';



const PrivateRoute = ({ component: Component, ...rest }) => (


  <Route {...rest} render={props => (
    rest.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/auth/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;