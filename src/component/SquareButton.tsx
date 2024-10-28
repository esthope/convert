import {useState, ReactElement} from "react";

const SquareButton = ({action, text, onClick}: {action: string, text: string, onClick: Function}): ReactElement => {

	return (
		<button id={action} type="button"  onClick={onClick} className="squareButton flex-center"> 
			<span>{text}</span>
		</button>

	)
}

export default SquareButton;