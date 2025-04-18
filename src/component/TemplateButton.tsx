// main
import {isMobile} from 'react-device-detect';
import {ReactElement, cloneElement, isValidElement, memo} from "react";
import {useState, useEffect, useRef} from 'react';

interface TemplateProp {
	children:ReactElement,
	label?:string,
	started:boolean,
	shift:boolean,
	board_key:string
}

const TemplateButton = ({children, label, started, shift, board_key}:TemplateProp) => {
	const firstLabel = (isMobile) ? 'name-label' : 'key-label';

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
		// if (!isMobile) {} tester avec et sans sur mobile car pas de hover
		// const isMobile = /iPhone|iPad|Android/.test(navigator.userAgent);
		intervalRef.current = setInterval(() => {
			setPositionStyle((current:any) => {
      			let style = (current.includes('name-label')) ? 'key-label' : 'name-label';
      			return style
      		})
	    }, 1400)
	}

	/**
	 * hide the labels when the mouse leaves the button
	 */
	const hide_label = ():void => {
		console.log('hide')
		clearInterval(intervalRef.current)
		intervalRef.current = undefined;

		// keep the label if the content of editorState is initial
		if (!started)
			setPositionStyle(firstLabel)
		else
			setPositionStyle('')
	}

	/**
	 * Clear the interval on reender
	 */
	useEffect(()=>{
		/* return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = undefined;
			}
		}*/
		console.log(intervalRef.current)
	}, [])

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