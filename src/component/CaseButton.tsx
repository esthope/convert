import {ReactElement} from "react";

const CaseButton = ({content, onClick}: {content: string|Function, onClick: any}): ReactElement => {

	return (
		<button
			type="button"
			onClick={onClick}
			className="squareButton green-background flex-center"
        	onMouseDown={(e) => e.preventDefault()}
			> 

			{(typeof content === 'function')
				? content()
				: <span>{content}</span>
			}
		</button>
	)
}

export default CaseButton;