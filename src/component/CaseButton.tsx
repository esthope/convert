// main
import {ReactElement} from "react";
import {useState, useEffect} from 'react';
// util
import {EditorContext} from 'service/context';
// element
import {DynamicLabels, hide_label, show_label} from './DynamicLabels';


const CaseButton = ({entry, label, content, board_key, length, onClick}:{entry:string, label?:string, content?:string|Function, board_key?:string, length:number, onClick:any}): ReactElement => {

	const 
	        [hasMounted, setHasMounted] = useState<boolean>(false),
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

	return (
		<div
			className="flex-center column"
			onMouseLeave={()=>hide_label(interval, started, setPositionStyle)}
		>
			<button
				type="button"
				onClick={onClick}
				onMouseOver={()=>show_label(setPositionStyle, setStyleInterval)}
				className="caseButton green-background flex-center"
	        	onMouseDown={(e) => e.preventDefault()}
				> 

				{(typeof content === 'function')
					? content()
					: <span>{content}</span>
				}
			</button>
			<DynamicLabels positionStyle={positionStyle} label={label} board_key={board_key}/>
		</div>
	)
}

export default CaseButton;