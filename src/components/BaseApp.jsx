import React from 'react'

import Tools from '../common/Tools'
import WebServices from '../common/WebServices'

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {};
	}

	componentWillMount() {
		let me = this,
			params = Tools.getParams();

		if (params.title)
			document.title = params.title;

		// 取页面配置JSON
		WebServices.getPageService(params.pageid, params.linkid, params.title).then(function (result) {
			me.setState({page: result});
		}, function (error) {
			console.log(error);
		});
	}
}
