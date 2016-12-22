import React from 'react';

export default class TablePage extends React.Component {
	static propTypes = {
		page: React.PropTypes.object
	};

	static defaultProps = {
		page: null
	};

	constructor(props) {
		super(props);
		this.state = {

		}
  	render() {
    return (
			<div>
				<p>Hello TablePage!</p>
			</div>
    )
  }
}
