// main
import {ReactElement} from "react";
import {useState, useEffect, useRef} from 'react';

// element
import CopyIcon from 'component/icons/CopyIcon';
import CircleIcon from 'component/icons/CircleIcon';
import CutIcon from 'component/icons/CutIcon';
import PastIcon from 'component/icons/PastIcon';
import ResetIcon from 'component/icons/ResetIcon';

interface ActionProp {
	entry:string,
	label?:string,
	onMouseEnter?:Function,
	onClick?:Function
}

const ActionButton = ({entry, label, onMouseEnter, onClick}:ActionProp):ReactElement => {
	// const [iconPath, setIconPath] = useState<any>()
	const [IconPath, setIconPath] = useState<any>(CircleIcon)
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
			// const path = require(`../assets/${entry}.svg`)
			switch (entry) {
				case 'copy':
				case 'cut':
				case 'past':
				case 'reset':
					
					break;
				 default:	
			}
			setIconPath(CutIcon)
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
			<IconPath stroke="white" />

        	{/*<img
	        	src={iconPath}
	        	alt={label}
				{...imageProp}
        	/>*/}
	    </button>
	)
}

// const ActionButtonMemo = memo(ActionButton);
export default ActionButton;