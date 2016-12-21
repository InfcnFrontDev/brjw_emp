import React from 'react'

export default class CanvasRole extends React.Component {

	static propTypes = {
		role: React.PropTypes.object,
		canvas: React.PropTypes.object
	};

	static defaultProps = {
		role: null,
		canvas: null
	};

	componentWillMount() {
		console.log("CanvasRole componentWillMount");
	}

	render() {
		console.log("CanvasRole render");
		return (
			<div>
				<canvas ref="canvas" width="1000" height="500"></canvas>
			</div>
		);
	}

	componentDidMount() {
		console.log("CanvasRole componentDidMount");
		// let ra = new Array(),
		// 	canvas = this.props.canvas;
		// console.log(this.props.canvas);
		// if (canvas) {
		// 	ra.push(new StoreCooling.OwmPump1(canvas, 273, 222, 64, 64, 0, false, 305, 254));
		// 	ra.push(new StoreCooling.Fan(canvas, 379, 359, 64, 64, 0, false, 411, 391));
		// 	ra.push(new StoreCooling.Pipe(canvas, 367, 145, 64, 10, 0, false, 399, 150, 10));
		// 	ra.push(new Ems.StdLib.Button({X: 500, Y: 220, Width: 64, Height: 26, RotateAngle: 0, Flip: false}));
		// 	ra.push(new StoreCooling.OwmPump(canvas, 202, 154, 54, 64, 0, false, 229, 186));
		// 	ra.push(new StoreCooling.Unit(canvas, 240, 89, 64, 52, 0, false, 272, 115));
		// }
	}
}
