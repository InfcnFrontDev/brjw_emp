import React from 'react';

/**
 * ExcelWebPage.aspx
 */
export default class ExcelWebPage extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);

		// 初始化状态
		this.state = {}
	}

	/**
	 * 组件渲染之前
	 */
	componentWillMount() {
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		let {page} = this.props;

		return (
			<div>
				This is a ExcelWebPage.
			</div>
		)

	}

	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.init();
	}

	// 初始化
	init() {
		let {page} = this.props;

		// TODO
	}

}
