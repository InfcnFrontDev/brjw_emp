import React from 'react'

import BaseApp from '../../components/BaseApp'
import HeatMapWebPage from './HeatMapWebPage'

/**
 * 页面的根组件
 */
export default class App extends BaseApp {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props)
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		let WebPage = <div>Loading...</div>,
			{page} = this.state;

		if (page) {
			WebPage = <HeatMapWebPage page={page}/>;
		}

		return (
			<div>
				{WebPage}
			</div>
		)
	}
}
