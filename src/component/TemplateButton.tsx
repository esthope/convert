// main
import {isMobile} from 'react-device-detect';
import {ReactElement, cloneElement, isValidElement, memo} from "react";
import {useState, useEffect} from 'react';

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
			[interval, setStyleInterval] = useState<ReturnType<typeof setTimeout>>()

	const keyLabel = `ctrl · ${shift ? `maj · ${board_key}` : board_key}`;

	// Display the keyboard shortcuts on arrival
	useEffect(()=>{
	    if (started) 
    	{
    		setPositionStyle('')
    	}
	}, [started])

	/**
	 * show label when the button is over
	 * Switch on name and shortcut
	 */
	const show_label = ():void => {
		// first state is the name label
		let label_state = 'name-label'; 
		setPositionStyle(label_state)

		// second state is the key shortcut, switch between
		// if (!isMobile) {} tester avec et sans sur mobile car pas de hover
		const styleInterval = setInterval(() => {
			setPositionStyle((current:any) => {
      			let style = (current.includes('name-label')) ? 'key-label' : 'name-label';
      			return style
      		})
			console.log('interval')
	    }, 1400)

		// set interval to stop the switch on over out
	    setStyleInterval(styleInterval)
	}

	/**
	 * hide the labels when the mouse leaves the nbutton
	 */
	const hide_label = ():void => {
		clearInterval(interval)
	    setStyleInterval(undefined)

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