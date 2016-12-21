import React from 'react'
import $ from 'jquery';
import echarts from 'echarts'
import ECharts from '../components/ECharts'

const propTypes = {
	role: React.PropTypes.object
};

const defaultProps = {
	role: null
};

class EchartsRole extends React.Component {

	render() {
		let children = [];

		console.log(this.props.role);

		return (
			<div>
				<ECharts
					option={this.props.role.Actor.ChartOption}
					notMerge
					style={{width: 700 + 'px', height: 400 + 'px'}}
				/>
			</div>
		)
	}
}

EchartsRole.propTypes = propTypes;
EchartsRole.defaultProps = defaultProps;

export default EchartsRole;
