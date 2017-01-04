import React from 'react';

/**
 * HtmlWebPage.aspx
 */
export default class HtmlWebPage extends React.Component {

	/**
	 * 构造方法
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {}
	}

	/**
	 * 组件渲染
	 * @returns {XML}
	 */
	render() {
		let {page} = this.props;
		return (
			<div ref="htmlBody"></div>
		)
	}


	/**
	 * 组件渲染完成
	 */
	componentDidMount() {
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {

		let {page} = this.props;
		let tem = page.HtmlTemplate;
		tem = tem.split("##");
		tem[1] = page.HtmlCssText;
		tem[3] = '';
		tem[5] = '';

		tem[9] = "background:" + page.BackColor;
		tem[11] = page.HtmlBodyText;

		let str = '';
		for (var i = 0; i < tem.length; i++) {
			str += tem[i];
		}
		// console.log(str);

		this.refs.htmlBody.innerHTML = str;
		let scriptNode = document.createElement("script");

		scriptNode.innerHTML = page.UserJavaScript;
		//在ff中， innerHTML是可读写的，但在ie中，它是只读的.

		document.getElementsByTagName("body")[0].setAttribute("style", "background:" + page.BackColor + "");
		document.getElementsByTagName("body")[0].appendChild(scriptNode);
	}
}
