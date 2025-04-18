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
	statut?:String,
	onClick?:Function
}

const ActionButton = ({entry, label, onMouseEnter, statut, onClick}:ActionProp):ReactElement => {
	const [IconPath, setIconPath] = useState<any>(CircleIcon);

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
	
		switch (entry) {
			case 'copy':
				setIconPath(CopyIcon)
			break;
			case 'cut':
				setIconPath(CutIcon)
			break;
			case 'past':
				setIconPath(PastIcon)
			break;
			case 'reset':
				setIconPath(ResetIcon)
			break;
			default:
				setIconPath(CircleIcon)
		}

		return () => {unmounted.current = true}
	}, [entry])

	return (
		<button
			type="button"
			className={`${statut?.includes(entry) ? statut.split(' ').pop() : ''} actionButton mbe-06 flex-center column no-bg no-border`}
			{...buttonProp}
		>
			<IconPath
				stroke='currentColor'
				fill={(entry === 'reset' || entry === 'copy') ? 'currentColor' : 'transparent'}
				{...imageProp}
				/>
	    </button>
	)
}

// const ActionButtonMemo = memo(ActionButton);
export default ActionButton;