// main
import {ReactElement} from "react";
import {useState, useEffect} from 'react';
// element
import CircleIncon from "assets/circle.svg"

interface ActionProp {
	entry:string,
	label?:string,
	onMouseEnter?:Function,
	onClick?:Function
}

const ActionButton = ({entry, label, onMouseEnter, onClick}:ActionProp):ReactElement => {

	const [iconPath, setIconPath] = useState<string>(CircleIncon)
	let buttonProp:object = {},
		imageProp:object = {};

	if (onClick) buttonProp = {onClick: onClick};
	if (onMouseEnter) imageProp = {onMouseEnter: onMouseEnter};

	// get the button icon
	useEffect(()=>{
		const promise = import(`../assets/${entry}.svg`)
		promise.then((image) => {
			setIconPath(image.default)
		}).catch((err)=>{console.log(err.message)/*[!] DEV*/})
	}, [entry])

	return (
		<button
			type="button"
			className="actionButton flex-center column no-bg no-border"
			{...buttonProp}
		>
        	<img
        	src={iconPath}
        	alt={label}
			{...imageProp}
        	/>
	    </button>
	)
}

// const ActionButtonMemo = memo(ActionButton);
export default ActionButton;