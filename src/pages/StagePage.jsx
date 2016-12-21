import React from 'react';

import EchartsRole from '../roles/EchartsRole'

const propTypes = {
	page: React.PropTypes.object
};

const defaultProps = {
	page: null
};

class StagePage extends React.Component {

	render() {

		let roles = this.props.page.Roles.map(role => {
			if (role.Actor.ActorType.indexOf('ECharts') != '-1') {
				return <EchartsRole key={role.RoleID} role={role}/>;
			}else if (role.Actor.ActorType.indexOf('aaaaa') != '-1') {
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

StagePage.propTypes = propTypes;
StagePage.defaultProps = defaultProps;

export default StagePage;
