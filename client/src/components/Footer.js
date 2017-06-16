import React, { Component } from 'react';
import styles from './styles/FooterStyles';


export default class Footer extends Component {
	constructor(props) {
		super(props);

	}



	render() {
		return (
			<footer style={styles.main}>
					<a href='https://www.linkedin.com/in/joonas-mustonen-a82921107/' target='_blank'>
						Linkedin
					</a>
					{' '}
					| github:
					{' '}
					<a href='https://github.com/mustjoon' target='_blank'>
						mustjoon
					</a>
			</footer>
		);
	}
}

	
	
	
