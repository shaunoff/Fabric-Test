import React, { Component } from 'react';
import {
	MdFormatShapes,
	MdFormatSize,
	MdInsertPhoto,
	MdCropSquare,
	MdFormatColorFill,
	MdFormatColorText,
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
} from 'react-icons/lib/md';
import { TwitterPicker } from 'react-color'


class CanvasTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: false,
			textPositionSelect: false
		}
		this.addText = this.addText.bind(this)
		this.changeColor = this.changeColor.bind(this)
		this.textPosition = this.textPosition.bind(this)
	}

	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
		console.log(this.canvas)
		this.canvas.on('mouse:down', (click) =>{
  		if(this.state.textPositionSelect){
				this.addText(click.e.layerX, click.e.layerY)
				this.setState({textPositionSelect: false})
			}
		})
	}
	addText(x,y){
		var text = new window.fabric.IText('Text Box', { left: x, top: y , opacity: 1});
		this.canvas.add(text);
	}
	textPosition(){
		this.setState({textPositionSelect: !this.state.textPositionselect})
	}
	changeColor(color){
		const obj = this.canvas.getActiveObject()
		if (obj.setSelectionStyles && obj.isEditing) {
			let style = {}
			style.fill = color.hex
			obj.setSelectionStyles(style)
		}
		else {
			obj.removeStyle('fill')
			obj.setColor(color.hex)
		}
		this.canvas.renderAll()
	}
	render() {

		return (
			<div>
				<div onClick={this.changeColor}>change to red</div>
				<div>This is a test canvas</div>
				<div onClick={this.textPosition}>Text Active</div>
				<div style={{display: 'flex', background: "#fafafa", border: '1px solid #ccc', width: '500px', marginLeft: '60px'}}>
					<MdFormatShapes onClick={this.textPosition} style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdInsertPhoto style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdCropSquare style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<div style={{borderRight: '1px solid #ccc'}}></div>
					<MdFormatColorText style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<TwitterPicker 
            onChange={ this.changeColor }
          />
					<MdFormatColorFill style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<div style={{borderRight: '1px solid #ccc'}}></div>
					<MdFormatBold style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdFormatItalic style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdFormatUnderlined style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
				</div>
				<canvas id="fabricTest" width="500" height="500" style={{marginLeft: "60px", border: '1px solid #ccc'}}/>
			</div>
		);
	}

}

export default CanvasTest;
