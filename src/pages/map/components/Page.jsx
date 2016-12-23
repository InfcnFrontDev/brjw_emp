import React from 'react';

export default class Page extends React.Component {

	render() {
		let {page} = this.props;

		return (
			<div>
				<p>Hello MapPage! {page.PageID}</p>
			</div>
		)
	}

}
