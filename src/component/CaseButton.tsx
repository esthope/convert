import {ReactElement} from "react";

interface CaseInterface {
	content?:string|Function,
	onMouseEnter?:any,
	onClick:any
}

const CaseButton = ({content, onMouseEnter, onClick}:CaseInterface): ReactElement => {

	return (
			<button
				type="button"
				onClick={onClick}
				className="caseButton green-background flex-center"
				onMouseEnter={onMouseEnter}
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