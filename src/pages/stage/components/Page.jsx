import React from 'react';

import ActorFactory from '../../../common/ActorFactory';
import PageScript from '../../../common/PageScript'

export default class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	// 初始化 vars
	componentWillMount() {
		let {page} = this.props;
		var dataSets = new Array();
		var ra = new Array();
		var opts = new Array();
		var ca = new Array();
		var oricanBounds = new Array();
		var cadivid = new Array();
		var divchange = new Array();
		var oriPageBounds = {left: 0, top: 0, width: page.ScaledSize.Width, height: page.ScaledSize.Height};
		var hmIndex = 0;
		var excelObj = {};
		var hmArr = new Array();
		var exlArr = new Array();
		var clickObj = new Array();
		var divboundsArr = new Array();
		var inputActorArr = new Array();
		var pageCanvas = null;
		var pageId = 'mypage';

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
			pageCanvas,
			pageId
		});

	}

	render() {
		let {page} = this.props;

		let page_props = {},
			canvas_props = {
				width: page.Size.Width,
				height: page.Size.Height
			};

		return (
			<div id="mypage" {...page_props}>
				<canvas id="pageCanvas" {...canvas_props}></canvas>
			</div>
		)
	}

	componentDidMount() {
		let me = this;

		this.initCanvas();
		this.loadJs(function () {
			me.ready();
		});
	}


	// 初始化 fabric.Canvas
	initCanvas() {
		let me = this;

		pageCanvas = new fabric.Canvas('pageCanvas', {
			selection: false,
			allowTouchScrolling: true,
			renderOnAddRemove: false
		});
	}

	// 加载图元依赖的JS
	loadJs(callback) {
		let page = this.props.page;
		PageScript.loadStagePageJs(page, callback);
	}

	ready() {
		this.initStagePage();
		doResize('Manual', false);
		this.updatePage();
		this.windowsActions();
	}


	initStagePage() {
		let Page = this.props.page,
			Roles = Page.Roles

		Roles.forEach((r, i) => {
			console.log(r.Actor.ActorType);
			ActorFactory.initActor(r, pageCanvas, i);
		});

		var oriBounds = {};
		oriBounds.width = getoriCanvasSize(pageCanvas).width;
		oriBounds.height = getoriCanvasSize(pageCanvas).height;
		oriBounds.left = 0;
		oriBounds.top = 0;
		oricanBounds.push(oriBounds);
		ca.push(pageCanvas);
		cadivid.push('pageCanvas');

		pageCanvas.renderAll();
	}

	updateStagePage() {
		let Page = this.props.page,
			Roles = Page.Roles

		hmIndex = 0;
		Roles.forEach((r, i) => {
			ActorFactory.updateActor(r, pageCanvas, i);
		});

		pageCanvas.renderAll();
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




