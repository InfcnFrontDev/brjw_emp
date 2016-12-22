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
		return (
			<div></div>
		);
	}

	componentDidMount() {
		let me = this;
		this.loadJs(function () {
			me.ready();
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
		doResize('Manual', false);
		this.updatePage();
		// windowsActions();
	}


	initStagePage() {
		let {roles} = this.props;

		//需要用init()初始化的fabric图元; RiseArrow图元需要init初始化。
		let initFabricActors = [
			"StoreCooling.RiseArrow",
			"Ems.Energy.Balance.Lib.LinkLine",
			"Ems.Energy.Balance.Lib.RectangleActor",
			"Ems.Energy.Balance.Lib.DiamondActor",
			"Ems.Energy.Balance.Lib.EllipseActor",
			"Ems.Energy.Balance.Lib.HexagonActor",
			"Ems.Energy.Balance.Lib.ParallelogramActor",
			"Ems.Energy.Balance.Lib.TrapezoidActor",
			"Ems.Energy.Balance.Lib.TriangleActor"
		];

		roles.forEach(r => {
			let fn = eval(r.Actor.ActorType);
			let actor = new fn(mypage_canvas, r.Bounds.X, r.Bounds.Y, r.Bounds.Width, r.Bounds.Height, r.RotateAngle, r.Flip, r.Center.X, r.Center.Y, r.Actor.Diameter);

			//需要用init()初始化的fabric图元; RiseArrow图元需要init初始化。
			if (initFabricActors.includes(r.Actor.ActorType)) {
				actor.init({});
			}

			opts.push({});
			ra.push(actor);
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
