import React from 'react';
import loadjs from 'loadjs'

import ActorFactory from '../common/ActorFactory';
import ActorTypes from '../common/ActorTypes'

export default class StagePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			echartsActorTypes: [
				"Ems.ECharts.Actor.EChartsBarActor",
				"Ems.ECharts.Actor.EChartsLineActor",
				"Ems.ECharts.Actor.EChartsPieActor"
			],
			fabricActorTypes: [
				"StoreCooling.OwmPump1",
				"StoreCooling.Fan",
				"StoreCooling.Pipe",
				"StoreCooling.OwmPump",
				"StoreCooling.Unit"
			],
			// 格式文本和滚动文本
			textActors: [
				"Ems.StdLib.FormatLabel",
				"Ems.StdLib.MultilineText"
			],
			// 输入图元控件
			inputActorTypes: [
				"Ems.DataSourceActor.DSGroupBoxActor",
				"Ems.DataSourceActor.DSButton",
				"Ems.DataSourceActor.DSDateTimeActor",
				"Ems.DataSourceActor.DSComboBox",
				"Ems.DataSourceActor.DSListBoxActor",
				"Ems.DataSourceActor.DSRadioButton",
				"Ems.DataSourceActor.DSCheckBox",
				"Ems.StdLib.TextBox",
				"Ems.StdLib.Button",
				"Ems.StdLib.NumericUpDown",
				"Ems.StdLib.ComboBox",
				"Ems.StdLib.RadioButton",
				"Ems.StdLib.CheckBox",
				"StoreCooling.DateTimeActor"
			],
			webActorTypes: [
				"Ems.StdLib.SvgActor",
				"StoreCooling.PictureActor",
				"Ems.DataSourceActor.DSGroupBoxActor",
				"Ems.DataSourceActor.DSButton",
				"Ems.DataSourceActor.DSDateTimeActor",
				"Ems.DataSourceActor.DSComboBox",
				"Ems.DataSourceActor.DSListBoxActor",
				"Ems.DataSourceActor.DSRadioButton",
				"Ems.DataSourceActor.DSCheckBox",
				"Ems.StdLib.TextBox",
				"Ems.StdLib.Button",
				"Ems.StdLib.NumericUpDown",
				"Ems.StdLib.ComboBox",
				"Ems.StdLib.RadioButton",
				"Ems.StdLib.CheckBox",
				"StoreCooling.DateTimeActor"
			],
			chartActorTypes: [
				"Ems.Client.Charts.BarChartActor",
				"Ems.Client.Charts.LineChartActor",
				"Ems.Client.Charts.PieChartActor",
				"Ems.Client.Charts.FunnelChartActor",
				"Ems.Client.Charts.AreaChartActor",
				"Ems.Client.Charts.RangeChartActor",
				"Ems.Client.Charts.RadarChartActor"
			],
			gaugeActorTypes: [
				"Ems.Client.Charts.CircularGaugeActor"
			],
			//需要用init()初始化的fabric图元; RiseArrow图元需要init初始化。
			initFabricActors: [
				"StoreCooling.RiseArrow",
				"Ems.Energy.Balance.Lib.LinkLine",
				"Ems.Energy.Balance.Lib.RectangleActor",
				"Ems.Energy.Balance.Lib.DiamondActor",
				"Ems.Energy.Balance.Lib.EllipseActor",
				"Ems.Energy.Balance.Lib.HexagonActor",
				"Ems.Energy.Balance.Lib.ParallelogramActor",
				"Ems.Energy.Balance.Lib.TrapezoidActor",
				"Ems.Energy.Balance.Lib.TriangleActor"
			]
		};
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
		let Page = this.props.page,
			Roles = Page.Roles,
			jsArray = new Array();

		Roles.forEach(r => {
			let actorType = r.Actor.ActorType;
			if (ActorTypes.echarts.includes(actorType)) {
				jsArray.push('scripts/EChartsHelper.js');
			} else if (ActorTypes.gauge.includes(actorType)) {
				jsArray.push('scripts/BrGauge.js');
				jsArray.push('scripts/mscorlib.js');
				jsArray.push('scripts/PerfectWidgets.js');
				jsArray.push('scripts/pageroles/GaugeBase.js');
			} else {
				jsArray.push('scripts/pageroles/' + actorType + '.js');
			}
		});
		loadjs(jsArray, {success: callback});
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




