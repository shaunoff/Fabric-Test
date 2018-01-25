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
		this.editTextStyles = this.editTextStyles.bind(this)
	}

	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
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

	editTextStyles(action) {
		const object = this.canvas.getActiveObject()
		if (object) {
			let curStyles = object.getSelectionStyles()
			switch(action) {
				case 'underline':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'underline', !curStyles[0][action])
					} else {
						let isUnderline = this.getStyle(object, 'underline') === true
						this.setStyle(object, 'underline', isUnderline ? false : true)
					}
				break

				case 'italic':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'fontStyle', curStyles[0]['fontStyle'] ? '' : 'italic')
					} else {
						let isItalic = this.getStyle(object, 'fontStyle') === 'italic'
						this.setStyle(object, 'fontStyle', isItalic ? '' : 'italic')
					}
				break

				case 'bold':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'fontWeight', curStyles[0]['fontWeight'] ? '' : 'bold')
					} else {
						let isBold = this.getStyle(object, 'fontWeight') === 'bold'
						this.setStyle(object, 'fontWeight', isBold ? '' : 'bold')
					}
				break
			}
		}
		this.canvas.renderAll()
	}

	getStyle(object, styleName) {
		return object[styleName]
	}

	setStyle(object, styleName, value) {
		// console.log(styleName, value)
		object.set(styleName, value)
		this.canvas.renderAll()
	}

	setIndividualStyles(object, styleName, value) {
		console.log(value)
		let style = {}
		style[styleName] = value
		object.setSelectionStyles(style)
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
					<MdFormatBold onClick={() => this.editTextStyles('bold')} style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdFormatItalic onClick={() => this.editTextStyles('italic')} style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
					<MdFormatUnderlined onClick={() => this.editTextStyles('underline')} style={{margin: "10px"}} size="25" color="rgba(0,0,0,.5)"/>
				</div>
				<canvas id="fabricTest" width="500" height="500" style={{marginLeft: "60px", border: '1px solid #ccc'}}/>
			</div>
		);
	}

}

export default CanvasTest;
