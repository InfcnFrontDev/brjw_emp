import React from 'react';

export default class Page extends React.Component {

	render() {
		let {page} = this.props;
		return (
			<div ref="htmlBody"></div>
		)
	}

	componentDidMount() {
		this.initHtmlPage();
	}

	initHtmlPage() {

		let {page} = this.props;
		let tem=page.HtmlTemplate;
		tem=tem.split("##");
		tem[1]=page.HtmlCssText;
		tem[3]='';
		tem[5]='';

		tem[9]="background:"+page.BackColor;
		tem[11]=page.HtmlBodyText;

		let str='';
		for(var i=0; i<tem.length; i++){
			str+=tem[i];
		}
		// console.log(str);

		this.refs.htmlBody.innerHTML =str;
		let scriptNode=document.createElement("script");

		scriptNode.innerHTML=page.UserJavaScript;
		//在ff中， innerHTML是可读写的，但在ie中，它是只读的.

		document.getElementsByTagName("body")[0].setAttribute("style","background:"+page.BackColor+"");
		document.getElementsByTagName("body")[0].appendChild(scriptNode);
	}
}
