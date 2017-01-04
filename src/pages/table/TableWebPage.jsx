import React from 'react';

/**
 * TableWebPage.aspx
 */
export default class TableWebPage extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {}
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		return (
			<div ref="tableBody"></div>
		)
	}

	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.init();
	}


	/**
	 * 初始化
	 */
	init() {
		let {page} = this.props;
		let divNode = '';
		for (let i = 0; i < page.RowCount; i++) {
			let divWidth = page.Width / page.ColCount;
			let divHeight = page.Height / page.RowCount;
			for (var j = 0; j < page.ColCount; j++) {
				divNode += '<div style="width:' + divWidth + 'px; height:' + divHeight + 'px; border:#000 ' + page.SpaceSize + 'px solid; ' +
					'position:absolute; left:' + divWidth * j + 'px; top:' + divHeight * i + 'px; "></div>'
			}
		}
		this.refs.tableBody.innerHTML = divNode;
	}
}
