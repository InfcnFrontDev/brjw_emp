import React from 'react'

import Tools from './common/Tools'
import WebServices from './common/WebServices'

import StagePage from './pages/StagePage'
import HtmlPage from './pages/HtmlPage'

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			page: null
		};
	}

	componentWillMount() {
		let me = this,
			params = Tools.getParams();

		WebServices.getPageService(params.pageid, params.linkid, params.title).then(function (result) {
			me.setState({page: result});
		}, function (error) {
			console.log(error);
		});
	}

	render() {
		let WebPage = null;
		if (this.state.page) {
			switch (this.state.page.PageType) {
				case 'StagePage':
					WebPage = <StagePage/>;
					break;
				case 'HtmlPage':
					WebPage = <HtmlPage/>;
					break;
			}

			console.log(WebPage);
		}
		return (
			<div>
				{ WebPage }
			</div>
		)
	}
}
