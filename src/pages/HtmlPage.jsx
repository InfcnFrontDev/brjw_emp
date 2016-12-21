import React from 'react';

export default class HtmlPage extends React.Component {
  render() {
  	console.log(this.props.abc)
    return (
      <div>
				<p>Hello HtmlPage!</p>
      </div>
    )
  }
}
