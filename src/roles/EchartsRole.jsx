
import React from 'react'
import ECharts from '../components/ECharts'

export default class EchartsRole extends React.Component {

	static propTypes = {
		role: React.PropTypes.object,
		style: React.PropTypes.object
	};

	static defaultProps = {
		role: null,
		style: null
	};

	render() {
		let children = [];

		let styleBounds = this.props.role.Actor.Bounds
		let style = {
			position:'absolute',
			width : styleBounds.Width+'px',
			height : styleBounds.Height+'px',
			left: styleBounds.Left+'px',
			top: styleBounds.Top+'px',
			border:'1px solid #000'
		}


		console.log(this.props.role.Actor.Bounds)
		return (
			<div>
				<ECharts
					option={this.props.role.Actor.ChartOption}
					notMerge
					style={style} 
					/>
				
			</div>
			
		)
	}
}
