import React from 'react';

import EchartsRole from '../roles/EchartsRole'
import CanvasRoles from '../roles/CanvasRoles'

export default class StagePage extends React.Component {

	static propTypes = {
		page: React.PropTypes.object
	};

	static defaultProps = {
		page: null
	};

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
			]
		};
	}

	render() {
		const {
			echartsActorTypes,
			chartActorTypes,
			gaugeActorTypes,
			webActorTypes,
			textActors,
			inputActorTypes
		} = this.state;

		const {page} = this.props;

		let roles = [], canvasRoles = [];

		this.props.page.Roles.forEach(role => {
			if (echartsActorTypes.includes(role.Actor.ActorType)) {
				// ECharts控件
				roles.push(<EchartsRole key={role.RoleID} role={role}/>);
			} else if (chartActorTypes.includes(role.Actor.ActorType)) {
				// ChartActorBase
				roles.push(<div key={role.RoleID}>chartActorTypes: {role.Actor.ActorType}</div>);
			} else if (gaugeActorTypes.includes(role.Actor.ActorType)) {
				// GaugeActorBase
				roles.push(<div key={role.RoleID}>gaugeActorTypes: {role.Actor.ActorType}</div>);
			} else if (webActorTypes.includes(role.Actor.ActorType)) {
				// 处理svg、pictures等
				roles.push(<div key={role.RoleID}>webActorTypes: {role.Actor.ActorType}</div>);
			} else if (textActors.includes(role.Actor.ActorType)) {
				//生成“FormatLabel”等textActors图元的初始化代码;riseArrow图元需要init参数，在此初始化
				roles.push(<div key={role.RoleID}>textActors: {role.Actor.ActorType}</div>);
			} else if (inputActorTypes.includes(role.Actor.ActorType)) {
				//生成“inputActors”图元的初始化代码
				roles.push(<div key={role.RoleID}>inputActorTypes: {role.Actor.ActorType}</div>);
			} else {
				// Fabric图元
				canvasRoles.push(role);
			}
		});

		roles.unshift(<CanvasRoles key="canvas-roles" page={page} roles={ canvasRoles }/>);

		return (
			<div ref="page" className="page stage-page">
				{roles}
			</div>
		)
	}

}




