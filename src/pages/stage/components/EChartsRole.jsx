import React from 'react';

// import ActorFactory from '../../common/ActorFactory';
// import PageScript from '../../common/PageScript'

/**
 * ECharts图元
 */
export default class EChartsRole extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		return null;
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
			{role, pageId} = this.props,
			ra;

		ra = initEcharts({
			X: role.Bounds.X,
			Y: role.Bounds.Y,
			Width: role.Bounds.Width,
			Height: role.Bounds.Height,
			parentid: pageId,
			position: false,
			visible: 'true'
		}, '');
		ra.setOption(role.Actor.ChartOption);

		this.setState({ra});
	}

}




