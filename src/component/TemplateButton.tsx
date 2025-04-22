// main
import {ReactElement, cloneElement, isValidElement, memo} from "react";
import {useState, useEffect, useRef} from 'react';

interface TemplateProp {
	children:ReactElement,
	label?:string,
	started:boolean,
	shift:boolean,
	board_key:string,
	is_mobile:boolean
}

const TemplateButton = ({children, label, started, shift, board_key, is_mobile}:TemplateProp) => {
	const firstLabel = (is_mobile) ? 'name-label' : 'key-label';

	const   [positionStyle, setPositionStyle] = useState<string>(firstLabel),
			intervalRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const keyLabel = `ctrl · ${shift ? `maj · ${board_key}` : board_key}`;

	// Display the keyboard shortcuts on arrival
	useEffect(()=>{
	    if (started) 
    	{
    		setPositionStyle('')
    	}
	}, [started])

	/**
	 * show label when the button is hovered
	 * Switch on name and shortcut
	 */
	const show_label = ():void => {
		// clear in case another interval is already set 
		clearInterval(intervalRef.current);

		// first state is the name label
		let label_state = 'name-label'; 
		setPositionStyle(label_state)

		// second state is the key shortcut, switch between
		if (!is_mobile) {
			intervalRef.current = setInterval(() => {
				setPositionStyle((current:any) => {
	      			let style = (current.includes('name-label')) ? 'key-label' : 'name-label';
	      			return style
	      		})
		    }, 1400)
		// if it's mobile mode and there is content
		} else if (started) {
			setTimeout(()=>{
				hide_label()
			}, 2000)
		}
	}

	/**
	 * hide the labels when the mouse leaves the button
	 */
	const hide_label = ():void => {
		clearInterval(intervalRef.current)
		intervalRef.current = undefined;

		// keep the label if the content of editorState is initial
		if (!started)
			setPositionStyle(firstLabel)
		else
			setPositionStyle('')
	}

	return (
		<div
			className="flex-center column"
			onMouseLeave={hide_label}
		>
			{isValidElement(children) ? cloneElement(children as ReactElement, { onMouseEnter: show_label }) : children}
			<div className="labelBox" >
		    	<div className={positionStyle} >
					<label className='block'>{label}</label>
					<label className='block'>{keyLabel}</label>
				</div>
			</div>
		</div>
	)
}

// const TemplateButtonMemo = memo(TemplateButton);
export default memo(TemplateButton);