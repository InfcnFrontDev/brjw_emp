import React from 'react'

import BaseApp from '../../components/BaseApp'
import HtmlPage from './HtmlPage'

export default class App extends BaseApp {

	constructor(props) {
		super(props)
	}

	render() {
		let WebPage = null,
			{page} = this.state;

		if (page) {
			WebPage = <HtmlPage page={page}/>;
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
