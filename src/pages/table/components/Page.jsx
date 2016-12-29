import React from 'react';

export default class Page extends React.Component {

	render() {
		return (
			<div ref="tableBody"></div>
		)
	}
	componentDidMount() {
		this.initTablePage();
	}
	initTablePage() {
		let {page} = this.props;
		let divNode = '';
		for(let i = 0; i < page.RowCount; i++){
			let divWidth = page.Width/page.ColCount;
			let divHeight = page.Height/page.RowCount;
			for(var j = 0; j < page.ColCount; j++){
				divNode += '<div style="width:'+divWidth+'px; height:'+divHeight+'px; border:#000 '+page.SpaceSize+'px solid; ' +
					'position:absolute; left:'+divWidth*j+'px; top:'+divHeight*i+'px; "></div>'
			}
		}
		this.refs.tableBody.innerHTML = divNode;
	}
}
