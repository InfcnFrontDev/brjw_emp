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

	render() {
		console.log('render');

		const echartsActors = [
				"Ems.ECharts.Actor.EChartsBarActor",
				"Ems.ECharts.Actor.EChartsLineActor",
				"Ems.ECharts.Actor.EChartsPieActor"
			],
			// 格式文本和滚动文本
			textActors = [
				"Ems.StdLib.FormatLabel",
				"Ems.StdLib.MultilineText"
			],
			// 输入图元控件
			inputActors = [
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
			webActors = [
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
			fabricActors = [];

		let roles = [], canvasRoles = [];

		this.props.page.Roles.forEach(role => {
			if (echartsActors.includes(role.Actor.ActorType)) {
				// ECharts图元
				roles.push(<EchartsRole key={role.RoleID} role={role}/>);
			} else if (fabricActors.includes(role.Actor.ActorType)) {
				// Fabric图元
				canvasRoles.push(role);
			} else {
				roles.push(<div key={role.RoleID}>no "{role.Actor.ActorType}" matching component</div>);
			}
		});

		roles.unshift(<CanvasRoles key="canvas-roles" roles={ canvasRoles }/>);

		return (
			<div ref="page" className="page stage-page">
				{roles}
			</div>
		)
	}

}




