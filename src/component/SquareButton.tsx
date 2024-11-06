import {useState, ReactElement} from "react";

const SquareButton = ({action, content, onClick}: {action: string, content: string|Function, onClick: Function}): ReactElement => {

	return (
		<button id={action} type="button" onClick={onClick} className="squareButton flex-center"> 
			{(typeof content === 'function')
				? content()
				: <span>{content}</span>
			}
		</button>
	)
}

export default SquareButton;