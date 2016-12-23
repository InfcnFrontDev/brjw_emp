import ActorTypes from './ActorTypes'


let factory = {

	initEchartsActor(r, i){
		ra.push(initEcharts({
			X: r.Bounds.X,
			Y: r.Bounds.Y,
			Width: r.Bounds.Width,
			Height: r.Bounds.Height,
			parentid: 'mypage',
			position: false,
			visible: 'true'
		}, ''));
		var oriBounds = {};
		oriBounds.width = r.Bounds.Width;
		oriBounds.height = r.Bounds.Height;
		oriBounds.left = r.Bounds.X;
		oriBounds.top = r.Bounds.Y;
		oricanBounds.push(oriBounds);
		ca.push('Ems.ECharts.Actor.EChart');
		cadivid.push(ra[i].getDom());
		opts.push(r.Actor.ChartOption);
	},

	updateEchartsActor(r, i){
		ra[i].clear();
		ra[i].setOption(opts[i]);
	},

	initCanvasActor(r, canvas, i){
		let fn = eval(r.Actor.ActorType);
		ra.push(new fn(canvas, r.Bounds.X, r.Bounds.Y, r.Bounds.Width, r.Bounds.Height, r.RotateAngle, r.Flip, r.Center.X, r.Center.Y, r.Actor.Diameter));
		opts.push({});
		ra[i].init(r.InitOption);
	},

	updateCanvasActor(r, canvas, i){
		ra[i].refresh(r.RefreshOption);
	},

	initGaugeActor(r, i){
		ra.push(new BrGauge({
			id: 'brguage' + i,
			X: r.Bounds.X,
			Y: r.Bounds.Y,
			Width: r.Bounds.Width,
			Height: r.Bounds.Height,
			RotateAngle: r.RotateAngle,
			parentid: pageId,
			position: false,
			Flip: 'False'
		}));
		var oriBounds = {};
		oriBounds.width = r.Bounds.Width;
		oriBounds.height = r.Bounds.Height;
		oriBounds.left = r.Bounds.Left;
		oriBounds.top = r.Bounds.Top;
		oricanBounds.push(oriBounds);
		ca.push('Ems.Client.Charts.Gauge');
		cadivid.push('brguage' + i);
		if (r.Actor.ActorType === 'Ems.Client.Charts.LinearGaugeActor')
			opts.push(BuildGaugeOption('LinearHorizontal.Style4', {
				Scale: [{
					Maximum: 500,
					Minimum: 0,
					Major: 6,
					Minor: 4
				}, {Maximum: 50, Minimum: 0, Major: 6, Minor: 4}]
			}));
		else
			opts.push(BuildGaugeOption('CircularFull.Style18', {Scale: [{Maximum: 100, Minimum: 0}]}));
	},

	updateGaugeActor(r, i){
		ra[i].setOption(opts[i]);
		ra[i].refresh(r.RefreshOption);
		ra[i].setValue([]);
	},

	initDataSourceActor(r, i){

	},

	updateDataSourceActor(r, i){

	},

	initTextActor(r, i){
		let fn = eval(r.Actor.ActorType);
		ra.push(new fn({
			X: r.Bounds.X,
			Y: r.Bounds.Y,
			Width: r.Bounds.Width,
			Height: r.Bounds.Height,
			RotateAngle: r.RotateAngle,
			Flip: r.Flip
		}));
		opts.push({});
		ra[i].init(r.InitOption);
	},

	updateTextActor(r, i){
		ra[i].refresh(r.RefreshOption);
	}
};

export default {

	initActor(r, canvas, i){
		let actorType = r.Actor.ActorType;
		if (ActorTypes.echarts.includes(actorType)) {// echarts
			factory.initEchartsActor(r, i);
		} else if (ActorTypes.gauge.includes(actorType)) { // 仪表盘
			factory.initGaugeActor(r, i);
		} else if (ActorTypes.dataSource.includes(actorType)) {  // 数据源控件
			factory.initDataSourceActor(r, i);
		} else if (ActorTypes.textActors.includes(actorType)) {  // 格式文本和滚动文本
			factory.initTextActor(r, i);
		} else {
			factory.initCanvasActor(r, canvas, i);
		}
	},

	updateActor(r, canvas, i){
		let actorType = r.Actor.ActorType;
		if (ActorTypes.echarts.includes(actorType)) {
			factory.updateEchartsActor(r, i);
		} else if (ActorTypes.gauge.includes(actorType)) {
			factory.updateGaugeActor(r, i);
		} else if (ActorTypes.dataSource.includes(actorType)) {
			factory.updateDataSourceActor(r, i);
		} else if (ActorTypes.textActors.includes(actorType)) {  // 格式文本和滚动文本
			factory.updateTextActor(r, i);
		} else {
			factory.updateCanvasActor(r, canvas, i);
		}
	}

}
