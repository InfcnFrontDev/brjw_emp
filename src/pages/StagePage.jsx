import React from 'react';

import EchartsRole from '../roles/EchartsRole'
import CanvasRoles from '../roles/CanvasRoles'

export default class StagePage extends React.Component {

	static propTypes = {
		page: React.PropTypes.object
	};

	static defaultProps = {
		page: null
	};

	render() {
		// ECharts图元
		let echartsRoles = [], otherRoles = [];

		this.props.page.Roles.forEach(role => {
			// ECharts图元
			if (role.Actor.ActorType.includes('ECharts')) {
				echartsRoles.push(<EchartsRole key={role.RoleID} role={role}/>);
			} else {
				otherRoles.push(role);
			}
		});

		return (
			<div ref="page" className="page stage-page">
				<CanvasRoles roles={ otherRoles }/>
				{echartsRoles}
			</div>
		)
	}

}




