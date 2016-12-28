import React from 'react'

import BaseApp from '../../components/BaseApp'
import Page from './components/Page'

export default class App extends BaseApp {

	constructor(props) {
		super(props)
	}

	render() {
		let WebPage = null,
			{page} = this.state;
		if (page) {
			WebPage = <Page page={page}/>;
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
