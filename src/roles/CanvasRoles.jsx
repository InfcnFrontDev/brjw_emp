import React from 'react'

export default class CanvasRoles extends React.Component {

	static propTypes = {
		roles: React.PropTypes.array
	};

	static defaultProps = {
		roles: []
	};

	render() {
		return (
			<div>
				<canvas ref="canvas" width="1000" height="500"></canvas>
			</div>
		);
	}

	componentDidMount() {
		let canvas = new fabric.Canvas(this.refs.canvas, {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});
		this.setState({
			canvas: canvas
		});

		console.log(this.props.roles);

		let ra = new Array();
		if (canvas) {
			ra.push(new StoreCooling.OwmPump1(canvas, 273, 222, 64, 64, 0, false, 305, 254));
			ra.push(new StoreCooling.Fan(canvas, 379, 359, 64, 64, 0, false, 411, 391));
			ra.push(new StoreCooling.Pipe(canvas, 367, 145, 64, 10, 0, false, 399, 150, 10));
			ra.push(new Ems.StdLib.Button({X: 500, Y: 220, Width: 64, Height: 26, RotateAngle: 0, Flip: false}));
			ra.push(new StoreCooling.OwmPump(canvas, 202, 154, 54, 64, 0, false, 229, 186));
			ra.push(new StoreCooling.Unit(canvas, 240, 89, 64, 52, 0, false, 272, 115));
		}
	}
}
