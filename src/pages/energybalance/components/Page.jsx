import React from 'react';

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		let {page} = this.props;
		let style = {
			'width':page.Size.Width,
			'height':page.Size.Height,
			'position':'absolute', 
			'left': '0px',
			'top': '0px', 
			'border': '1px solid ',
			'background':'url(../images/954586bb-bb08-4b8b-bb96-ae82e83f8fa0.png)'
			 
		};
		let canvas_style={};
		canvas_style = {
				width: page.Size.Width,
				height: page.Size.Height
			};
		let height =page.Size.Height;
		let width =	page.Size.Width;
		console.log(width,height)
		return (
			<div id="mypage_ctl00" style={style}>
				<canvas id="canvas" {...canvas_style}></canvas>
			</div>
			
		)

	}

	componentDidMount() {
		this.initPage();
	}

	initPage() {
		let me = this;

		var Canvas = new fabric.Canvas('canvas', {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});
	}

}
