import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const ActionButton = ({content, onClick}: {content: string, onClick: any}):ReactElement => {
	return (
		<button
			type="button"
			onClick={onClick} 
			className="test-button flex-center"
			>
			<span>{content}</span>
	    </button>
	)
}

export default ActionButton;