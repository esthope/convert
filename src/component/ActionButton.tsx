import {useState, useEffect} from 'react';
import {ReactElement} from "react";
import CircleIncon from "assets/circle.svg"

const ActionButton = ({icon, label, board_key, onClick}:{icon:string, label?:string, board_key?:string, onClick:any}):ReactElement => {

	const 	[iconPath, setIconPath] = useState<string>(CircleIncon),
			[hasMounted, setHasMounted] = useState<boolean>(false),
			[animation, setAnimation] = useState<boolean>(false),
			[showLabel, setShowLabel] = useState<boolean>(false),
			[labelClass, setLabelClass] = useState<string>('')

	useEffect(()=>{
		const promise = import(`../assets/${icon}.svg`)
		promise.then((image) => {
			setIconPath(image.default)
		})
	})

	function log(...variable:any) {
		console.log(...variable)
	}

	useEffect(() => {
		if (!hasMounted) {
	      setHasMounted(true);
	      return;
	    }

		let style = (showLabel) ? 'label-switch' : ''
		setLabelClass(style)
	}, [showLabel])

	// · no-border
	return (
	<div
		className="flex-center column"
	>
		<button
			type="button"
			onClick={onClick}
			className="actionButton flex-center column no-bg no-border"
		>
        	<img
        	src={iconPath}
			onMouseOver={()=>setShowLabel(true)}
			onMouseOut={()=>setShowLabel(false)}
        	alt={label} />
	    </button>
    	<div className="labelContainer">
			<label 
				className={`block ${labelClass}`}
				onMouseOver={()=>setShowLabel(true)}
				onMouseOut={()=>setShowLabel(false)}
				>{`ctrl · ${board_key}`}</label>
			<label
				className={`block ${labelClass}`}
				onMouseOver={()=>setShowLabel(true)}
				onMouseOut={()=>setShowLabel(false)}			
				>{label}</label>
		</div>
	</div>
	)
}

export default ActionButton;