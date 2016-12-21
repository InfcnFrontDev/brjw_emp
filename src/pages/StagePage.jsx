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
		let {
			style,
			...other,
		} = this.props;

		let style = {
			width: 1000,
			height: 600
		};


		let roles = this.props.page.Roles.map(role => {
			if (role.Actor.ActorType.indexOf('ECharts') != '-1') {
				return <EchartsRole key={role.RoleID} role={role}/>;
			} else if (role.Actor.ActorType.indexOf('aaaaa') != '-1') {
				return <EchartsRole key={role.RoleID} role={role}/>;
			}
			return <div>No "{role.Actor.ActorType}" matching components</div>
		});

		return (
			<div ref="page" style={style}>
				<canvas id="mypage_ctl01" width="1000" height="1500"></canvas>
				{roles}
			</div>
		)
	}
}

StagePage.propTypes = propTypes;
StagePage.defaultProps = defaultProps;

export default StagePage;
