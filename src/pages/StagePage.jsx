import React from 'react';

import EchartsRole from '../roles/EchartsRole'

export default class StagePage extends React.Component {
	render() {

		let roles = [];

		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);
		roles.push(<EchartsRole/>);

		return (
			<div>
				<p>Hello StagePage!</p>
				{roles}
			</div>
		)
	}
}
