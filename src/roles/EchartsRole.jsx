'use strict'
import React, {Component} from 'react'
import { Button } from 'react-bootstrap';

class Chart extends Component {
	render() {
		let children = [];

		children.push(<h2 key="key1">React UI Form demo</h2>);
		children.push(<div key="key2">{this.props.children}</div>);
		if (false)
			children.push(<div>hello {false ? 'aaaaa' : 'bbbbb'}</div>);

		children.push(<Button key="button">echars</Button>);

		return (
			<div>
				{children}
			</div>
		)
	}
}

export default Chart;
