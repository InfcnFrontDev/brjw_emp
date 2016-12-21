import React from 'react';

import EchartsRole from '../roles/EchartsRole'

export default class StagePage extends React.Component {

	render() {
		/*console.log(this.props.name)*/
		console.log(90909090)
		var Roles=this.props.name.Roles;
		console.log(this.props.name)
		let roles=Roles.map(item => {
			if(item.Actor.ActorType.indexOf('ECharts')){
				return <EchartsRole chartOption={item.Actor.ChartOption}
									Bounds={item.Bounds} />
				
			}

		})
		
		return (
			<div>
				<p>Hello StagePage!</p>
				{roles}
			</div>
		)
	}
}
