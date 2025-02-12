// main
import {ReactElement, memo} from "react";
import {useState, useEffect} from 'react';
// element
import CircleIncon from "assets/circle.svg"

interface ActionProp {
	entry?:string,
	label?:string,
	onMouseEnter?:any,
	onClick:any
}

const ActionButton = ({entry, label, onMouseEnter, onClick}:ActionProp):ReactElement => {

	const 	[iconPath, setIconPath] = useState<string>(CircleIncon)

	// get the button icon
	useEffect(()=>{
		const promise = import(`../assets/${entry}.svg`)
		promise.then((image) => {
			setIconPath(image.default)
		})
	}, [entry])

	return (
		<button
			type="button"
			onClick={onClick}
			className="actionButton flex-center column no-bg no-border"
		>
        	<img
        	src={iconPath}
			onMouseEnter={onMouseEnter}
        	alt={label} />
	    </button>
	)
}

// const ActionButtonMemo = memo(ActionButton);
export default ActionButton;