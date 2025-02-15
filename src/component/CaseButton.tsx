import {ReactElement} from "react";

interface CaseProp {
	content?:string|Function,
	onMouseEnter?:any,
	onClick:any
}

const CaseButton = ({content, onMouseEnter, onClick}:CaseProp): ReactElement => {

	return (
		<button
			type="button"
			onClick={onClick}
			className="caseButtonBase caseButton green-background flex-center"
			onMouseEnter={onMouseEnter}
        	onMouseDown={(event) => event.preventDefault()}
			> 

			{(typeof content === 'function')
				? content()
				: <span>{content}</span>
			}
		</button>
	)
}

export default CaseButton;