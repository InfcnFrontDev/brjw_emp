import React from "react";
import Chart from "./Chart";

/**
 * 默认主页页面的根组件
 */
export default class App extends React.Component {

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

		// 图列
		let cols = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
			let url = "../data/chart" + i + ".json";
			return (
				<div key={i} className="col-lg-4 col-md-6 col-sm-12 col-chart">
					<Chart url={url}/>
				</div>
			);
		});

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-xs-12 text-center header">
						<h1>图表展示板</h1>
						<hr/>
					</div>
				</div>
				<div className="row">
					{cols}
				</div>
			</div>
		)
	}
}
