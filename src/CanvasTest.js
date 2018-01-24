import React, { Component } from 'react';



class CanvasTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: false
		}
		this.addText = this.addText.bind(this)
		this.changeColor = this.changeColor.bind(this)
	}

	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
		console.log(this.canvas)
	}
	addText(){
		var text = new window.fabric.IText('gdfhjdg', { left: 100, top: 100 , opacity: 0.4});
		text.on('selected', () => {
 			this.setState({text: true})
		});
		this.canvas.add(text);
	}
	changeColor(){
		const obj = this.canvas.getActiveObject()
		console.log(obj)
		obj.setColor("#6bada7")
		obj.opacity = 0.1
		this.canvas.renderAll()

	}
	render() {

		return (
			<div>
				{this.state.text && <div onClick={this.changeColor}>change to red</div>}
				<div onClick={this.addText}>This is a test canvas</div>
				<canvas id="fabricTest" width="500" height="500" style={{border: '2px solid #ccc'}}/>
			</div>
		);
	}

}

export default CanvasTest;
