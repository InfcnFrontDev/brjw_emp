import React from 'react';

export default class Page extends React.Component {

	render() {
		let {page} = this.props;
		return (
			<div ref="htmlBody"></div>
		)
	}

	componentDidMount() {
		this.initHtmlPage();
	}

	initHtmlPage() {
		let {page} = this.props;
		this.refs.htmlBody.innerHTML = page.HtmlBodyText;
	}
}
