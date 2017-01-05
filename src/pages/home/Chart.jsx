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
			<div ref="chart" id={chartId} className="chart-area"></div>
		)
	}

	/**
	 * 组件渲染完成，初始化
	 */
	componentDidMount() {
		let me = this,
			{url} = this.props;

		let chart = echarts.init(this.refs.chart);
		// 自适应大小
		$(window).on('resize', function () {
			chart.resize();
		});

		chart.showLoading();
		$.getJSON(url, function (result) {
			chart.setOption(result);
			chart.hideLoading();
		});
	}

}
