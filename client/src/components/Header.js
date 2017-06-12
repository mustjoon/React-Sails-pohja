import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles/Header';



const auth = (isAuthenticated,logout,history) => {
	isAuthenticated ? logout() : history.push('/auth/login');
};

const navItems = (isAuthenticated) => {

	if(!isAuthenticated) return null;

	const navs = [{id: 1,text: 'Emojis',to: '/emoji'},{id:2,text: 'TicTacToe (Sockets testing)',to: '/tictactoe'}]

	let navItems = navs.map((nav) => {
		return (
			<Link key={nav.id} style={styles.navItem} to={nav.to}>{nav.text}</Link>
		)
	});
	return (
		<div style={styles.nav}>
			{navItems}
		</div>
	)
}


const Header = ({isAuthenticated,logout,history}) => {
	
	return (
		<div style={styles.container} className='topbar'>
			{navItems(isAuthenticated)}
			<div style={styles.toggle}
				onClick={() => auth(isAuthenticated,logout,history)}
			>{isAuthenticated ? 'Log out' : 'Sign in'}</div>
		</div>
	)

};

export default Header;