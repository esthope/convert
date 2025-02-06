import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const ActionButton = ({label, onClick}: {label:string, onClick:any}):ReactElement => {
	return (
		<button
			type="button"
			onClick={onClick} 
			className="caseButton green-background flex-center"
			>
			
			<span>{label}</span>
	    </button>
	)
}

export default ActionButton;