import React from 'react';
export default class HeatMapPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		let {page} = this.props;
		let style = {
			'position': 'absolute',
			'left': 0,
			'top': 0,
			'width':page.Width,
			'height':page.Height,
			'border': ' 1px solid #000',
		};

		return (
				<div  id="mypage_ctl00" style={style}></div>
		)

	}

	componentDidMount() {
		this.initHeatMapPage();
	}

	initHeatMapPage() {
		let {page} = this.props;
		var myChart=echarts.init(document.getElementById('mypage_ctl00'));
		 	echarts.registerMap('beijing', page.JsonData);
	   	var m=BuildChartOption('heatmap',{ 'file': page.JsonData, 'name': 'beijing'});
	   	myChart.setOption(m)
	}
}
