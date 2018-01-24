import React, { Component } from 'react';



class CanvasTest extends Component {
	constructor(props) {
		super(props);
		this.addText = this.addText.bind(this)
	}
	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
	}
	addText(){
		var text = new window.fabric.IText('gdfhjdg', { left: 100, top: 100 , opacity: 0.4});
		this.canvas.add(text);
	}
	render() {
		return (
			<div>
				<div onClick={this.addText}>This is a test canvas</div>
				<canvas id="fabricTest" width="500" height="500" style={{border: '2px solid #ccc'}}/>
			</div>
		);
	}

}

export default CanvasTest;
