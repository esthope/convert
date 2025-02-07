import {useState, useEffect} from 'react';
import {ReactElement} from "react";
import CircleIncon from "assets/circle.svg"

const ActionButton = ({entry, label, board_key, onClick}:{entry:string, label?:string, board_key?:string, onClick:any}):ReactElement => {

	const 	[iconPath, setIconPath] = useState<string>(CircleIncon),
			[positionStyle, setPositionStyle] = useState<string>(''),
			[interval, setStyleInterval] = useState<ReturnType<typeof setTimeout>>()

	useEffect(()=>{
		// get the button icon
		const promise = import(`../assets/${entry}.svg`)
		promise.then((image) => {
			setIconPath(image.default)
		})

		// show the keyboard shortcut for few seconds
		setPositionStyle('second-label')
		const styleInterval = setTimeout(() => {
			setPositionStyle('')
	    }, 2500)
	}, [])

	/**
	 * show label when the button is over
	 * Switch on name and shortcut
	 */
	const show_label = ():void => {
		// first state is the name label
		let label_state = 'first-label'; 
		setPositionStyle(label_state)

		// second state is the key shortcut, switch between
		const styleInterval = setInterval(() => {
			setPositionStyle((current:any) => {
      			let style = (current.includes('first-label')) ? 'second-label' : 'first-label';
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
		setPositionStyle('')
	}

	return (
	<div
		className="flex-center column"
		onMouseLeave={hide_label}			
	>
		<button
			type="button"
			onClick={onClick}
			className="actionButton flex-center column no-bg no-border"
		>
        	<img
        	src={iconPath}
			onMouseOver={show_label}
        	alt={label} />
	    </button>
    	<div className="labelBox" >
	    	<div className={positionStyle} >
				<label className='block'>{label}</label>
				<label className='block'>{`ctrl · ${board_key}`}</label>
			</div>
		</div>
	</div>
	)
}

export default ActionButton;