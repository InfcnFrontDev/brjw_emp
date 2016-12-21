
import React from 'react'
import ECharts from '../components/ECharts'

export default class EchartsRole extends React.Component {

	static propTypes = {
		role: React.PropTypes.object
	};

	static defaultProps = {
		role: null
	};

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
