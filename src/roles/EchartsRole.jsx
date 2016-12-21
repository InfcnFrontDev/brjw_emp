'use strict'
import React, {Component} from 'react'
import { Button } from 'react-bootstrap';
import echarts from 'echarts';

class Chart extends Component {
 	constructor(props) {
	    super(props);
	    console.log(this.props.chartOption)
	    this.state = {
	    	option: this.props.chartOption,
	    	Bounds:this.props.Bounds
	    }
	}
	componentWillMount(){
		 var myChart = echarts.init(document.getElementById('main'));
        	myChart.setOption(this.state.option);
	}
	render() {	
		 console.log(this.props.chartOption)
		return (
			<div >
				<div id="main"></div>
			</div>
			
		)
	}
}

export default Chart;
