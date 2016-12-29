import React from 'react'

import BaseApp from '../../components/BaseApp'
import TablePage from './TablePage'

export default class App extends BaseApp {

	constructor(props) {
		super(props)
	}

	render() {
		let WebPage = null,
			{page} = this.state;

		if (page) {
			WebPage = <TablePage page={page}/>;
		} else {
			WebPage = <div>Loading...</div>
		}

		return (
			<div>
				{WebPage}
			</div>
		)
	}
}
