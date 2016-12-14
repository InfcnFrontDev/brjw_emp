import React from 'react';
import styles from './index.scss';
import Chart from '../../components/Chart'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>It Works!</h1>
				<p>This React project just works including <span className={styles.redBg}>module</span> local styles.</p>
				<p>Enjoy!</p>
				<Chart>
					hello chart!
				</Chart>
			</div>
		)
	}
}