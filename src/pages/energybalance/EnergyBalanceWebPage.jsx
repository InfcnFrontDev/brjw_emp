import React from 'react';

/**
 * EnergyBalanceWebPage.aspx
 */
export default class EnergyBalanceWebPage extends React.Component {

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
		let {page} = this.props,
			energyId = 'energy-' + page.PageID;

		let style = {
			'width': page.Size.Width,
			'height': page.Size.Height,
			'position': 'absolute',
			'left': '0px',
			'top': '0px',
			'border': '1px solid ',
			'background': 'url(../images/954586bb-bb08-4b8b-bb96-ae82e83f8fa0.png)'
		};

		let canvas_props = {
			width: page.Size.Width,
			height: page.Size.Height
		};

		return (
			<div id={energyId} style={style}>
				<canvas id="canvas" {...canvas_props}></canvas>
			</div>
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
		let me = this,
			canvas;

		canvas = new fabric.Canvas('canvas', {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});

		this.setState({canvas});
	}

}
