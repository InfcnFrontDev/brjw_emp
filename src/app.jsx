import React from 'react'

import Tools from './common/Tools'
import WebServices from './common/WebServices'

import StagePage from './pages/StagePage'
import WordPage from './pages/WordPage'
import ExcelPage from './pages/ExcelPage'
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

		// 取页面配置JSON
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
					WebPage = <StagePage name={this.state.page}/>;
					break;
				case 'WordPage':
					WebPage = <WordPage/>;
					break;
				case 'ExcelPage':
					WebPage = <ExcelPage/>;
					break;
				case 'HtmlPage':
					WebPage = <HtmlPage/>;
					break;
				default:
					WebPage = <HtmlPage/>;
					break;
			}

		}
		return (
			<div>
				{ WebPage }
			</div>
		)
	}
}
