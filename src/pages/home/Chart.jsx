import React from "react";
import uuid from "uuid";

/**
 * ECharts图组件
 */
export default class Chart extends React.Component {

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
		let chartId = 'chart-' + uuid.v1();

		return (
			<div ref="chart" id={chartId} className="chart-area">Chart</div>
		)
	}

	/**
	 * 组件渲染完成，初始化
	 */
	componentDidMount() {
		let me = this,
			{url} = this.props;

		$.getJSON(url, function (result) {
			me.init(result);
		});
	}

	/**
	 * 初始化图表
	 * @param option
	 */
	init(option) {
		let chart = echarts.init(this.refs.chart);
		chart.setOption(option);

		// 自适应大小
		$(window).on('resize', function () {
			chart.resize();
		});
	}

}
