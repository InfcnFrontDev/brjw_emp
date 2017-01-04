import React from 'react';

/**
 * HeatMapWebPage.aspx
 */
export default class HeatMapWebPage extends React.Component {

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
			heatmapId = 'heatmap-' + page.PageID;

		let style = {
			'position': 'absolute',
			'left': 0,
			'top': 0,
			'width': page.Width,
			'height': page.Height,
			'border': '1px solid #000',
		};

		return (
			<div ref="heatmap" id={heatmapId} style={style}></div>
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
		let {page} = this.props,
			chart;

		chart = echarts.init(this.refs.heatmap);
		echarts.registerMap('beijing', page.JsonData);
		var m = BuildChartOption('heatmap', {'file': page.JsonData, 'name': 'beijing'});
		chart.setOption(m);

		this.setState({chart});
	}
}
