import React from 'react';

import EchartsRole from '../roles/EchartsRole'

export default class StagePage extends React.Component {

	render() {
		/*console.log(this.props.name)*/
		console.log(90909090)
		var roles=this.props.name.Roles;
		console.log(roles)
		for(let item in roles){
			
		}
		let roles = [];

		roles.push(<EchartsRole name={this.props.name}/>);
		

		return (
			<div>
				<p>Hello StagePage!</p>
				{roles}
			</div>
		)
	}
}
