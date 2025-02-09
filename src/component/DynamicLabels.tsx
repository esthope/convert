// main
import {ReactElement} from "react";
import {useState, useEffect} from 'react';

/**
 * show label when the button is over
 * Switch on name and shortcut
 */
const show_label = (setPositionStyle:any, setStyleInterval:any):void => {
	// first state is the name label
	let label_state = 'name-label'; 
	setPositionStyle(label_state)

	// second state is the key shortcut, switch between
	const styleInterval = setInterval(() => {
		setPositionStyle((current:any) => {
  			let style = (current.includes('name-label')) ? 'key-label' : 'name-label';
  			return style
  		})
    }, 2500)

	// set interval to stop the switch on over out
    setStyleInterval(styleInterval)
}

/**
 * hide the labels when the mouse leaves the nbutton
 */
const hide_label = (interval:any, started:any, setPositionStyle:any):void => {
	clearInterval(interval)

	// hide if the content of editorState is initial
	if (!started)
		setPositionStyle('key-label')
	else
		setPositionStyle('')
}

const DynamicLabels = ({positionStyle, label, board_key}:{positionStyle:string, label?:string, board_key?:string}):ReactElement => {

	return (
		<div className="bb labelBox" >
	    	<div className={positionStyle} >
				<label className='block'>{label}</label>
				<label className='block'>{`ctrl • ${board_key}`}</label>
			</div>
		</div>
	)
}

export {DynamicLabels, show_label, hide_label};