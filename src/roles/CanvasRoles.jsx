import React from 'react'
import loadjs from 'loadjs'
import Tools from '../common/Tools'

export default class CanvasRoles extends React.Component {

	static propTypes = {
		page: React.PropTypes.object,
		roles: React.PropTypes.array
	};

	static defaultProps = {
		page: null,
		roles: []
	};

	render() {
		let {page} = this.props,
			props = {
				width: page.Size.Width,
				height: page.Size.Height
			};

		return (
			<div>
				<canvas id="mypage_canvas" {...props}></canvas>
			</div>
		);
	}

	componentDidMount() {
		let me = this;

		this.initVars();
		this.initCanvas();
		this.loadJs(function () {
			me.ready();
		});
	}

	// 初始化 vars
	initVars() {
		var dataSets = new Array();
		var ra = new Array();
		var opts = new Array();
		var ca = new Array();
		var oricanBounds = new Array();
		var cadivid = new Array();
		var divchange = new Array();
		var oriPageBounds = {left: 0, top: 0, width: 900, height: 600};
		var hmIndex = 0;
		var excelObj = {};
		var hmArr = new Array();
		var exlArr = new Array();
		var clickObj = new Array();
		var divboundsArr = new Array();
		var inputActorArr = new Array();
		var mypage_canvas = null;

		Object.assign(window, {
			dataSets,
			ra,
			opts,
			ca,
			oricanBounds,
			cadivid,
			divchange,
			oriPageBounds,
			hmIndex,
			excelObj,
			hmArr,
			exlArr,
			clickObj,
			divboundsArr,
			inputActorArr,
			mypage_canvas
		});
	}

	// 初始化 fabric.Canvas
	initCanvas() {
		mypage_canvas = new fabric.Canvas('mypage_canvas', {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});
	}

	// 加载图元依赖的JS
	loadJs(callback) {
		let me = this,
			{roles} = this.props;

		// traverse and return role js
		let jsArray = roles.map(r => {
			return 'scripts/pageroles/' + r.Actor.ActorType + '.js';
		});

		loadjs(jsArray, {success: callback});
	}


	ready() {
		this.initStagePage();
		doResize('Manual',false);
		this.updatePage();
		// windowsActions();
	}


	initStagePage() {
		let {roles} = this.props;

		roles.forEach(r => {
			let fn = eval(r.Actor.ActorType);
			ra.push(new fn(mypage_canvas, r.Bounds.X, r.Bounds.Y, r.Bounds.Width, r.Bounds.Height, r.RotateAngle, r.Flip, r.Center.X, r.Center.Y, r.Actor.Diameter));
			opts.push({});
		});

		var oriBounds = {};
		oriBounds.width = getoriCanvasSize(mypage_canvas).width;
		oriBounds.height = getoriCanvasSize(mypage_canvas).height;
		oriBounds.left = 0;
		oriBounds.top = 0;
		oricanBounds.push(oriBounds);
		ca.push(mypage_canvas);
		cadivid.push('mypage_canvas');

		mypage_canvas.renderAll();

	}

	updateStagePage() {
		hmIndex = 0;
		ra.forEach(r => {
			r.refresh({Visible: true, Enabled: true});
		});
		mypage_canvas.renderAll();
	}

	timerefresh() {
	}


	getFrameTiming() {
	}

	updatePage() {
		this.updateStagePage();
	}

	windowsActions() {
		// parent.window.onresize = function () {
		// 	resizeTimer = setTimeout(doResize('Manual', false), 500);
		// };
		// document.onclick = doClick;
		// document.onmousemove = doMousemove;
		// setInterval(timerefresh, getFrameTiming());
	};


}
