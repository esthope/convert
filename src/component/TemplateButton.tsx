// main
import {ReactElement} from "react";
import {useState, useEffect} from 'react';

const TemplateButton = () => {
	const   [hasMounted, setHasMounted] = useState<boolean>(false),
	        [started, setStarted] = useState<boolean>(false),
			[positionStyle, setPositionStyle] = useState<string>('key-label'),
			[interval, setStyleInterval] = useState<ReturnType<typeof setTimeout>>()

	// Display the keyboard shortcuts on arrival
	useEffect(()=>{
		if (!hasMounted) {
	      setHasMounted(true);
	      return;
	    }

	    if (length > 1) 
    	{
    		setPositionStyle('')
    		setStarted(true)
    	}

	}, [length])

	/**
	 * show label when the button is over
	 * Switch on name and shortcut
	 */
	const show_label = ():void => {
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
	const hide_label = ():void => {
		clearInterval(interval)

		// hide if the content of editorState is initial
		if (!started)
			setPositionStyle('key-label')
		else
			setPositionStyle('')
	}

	return (
		<div
			className="flex-center column"
			onMouseLeave={hide_label}
		>
			{/*<ButtonComponent />*/}
			<div className="labelBox" >
		    	<div className={positionStyle} >
					<label className='block'>{label}</label>
					<label className='block'>{`ctrl · ${board_key}`}</label>
				</div>
			</div>
		</div>
	)
}

export TemplateButton