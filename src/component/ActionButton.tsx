import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const ActionButton = ({content, onClick}: {content: string, onClick: any}):ReactElement => {
	return (
		<button
			type="button"
			onClick={onClick} 
			className="squareButton green-background flex-center"
			>
			<span>{content}</span>
	    </button>
	)
}

export default ActionButton;