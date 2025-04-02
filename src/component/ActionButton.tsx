// main
import {ReactElement} from "react";
import {useState, useEffect, useRef} from 'react';
// element
import OrangeIcon from "assets/orange.svg"

interface ActionProp {
	entry:string,
	label?:string,
	onMouseEnter?:Function,
	onClick?:Function
}

const ActionButton = ({entry, label, onMouseEnter, onClick}:ActionProp):ReactElement => {

	const [iconPath, setIconPath] = useState<string>(OrangeIcon)
	let buttonProp:object = {},
		imageProp:object = {},
		unmounted = useRef(true);

	if (onClick) buttonProp = {onClick: onClick};
	if (onMouseEnter) imageProp = {onMouseEnter: onMouseEnter};

	// get the button icon
	useEffect(()=>{
		if (unmounted?.current) {
			unmounted.current = false
			return 
		}

		try
		{
			const path = require(`../assets/${entry}.svg`)
			setIconPath(path)
		}
		catch(err)
		{
			/*[DEV] message icon absent*/
		}

		return () => {unmounted.current = true}

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