import React from 'react';

import EchartsRole from '../roles/EchartsRole'



export default class StagePage extends React.Component {
	static propTypes = {
		page: React.PropTypes.object
	};

	static defaultProps = {
		page: null
	};
	render() {

		let roles = this.props.page.Roles.map(role => {
			if (role.Actor.ActorType.includes('ECharts')) {
				return <EchartsRole key={role.RoleID} role={role}/>;
			}
			return <div>No "{role.Actor.ActorType}" matching components</div>
		});
		return (
			<div>
				{roles}
			</div>
		)
	}
}




