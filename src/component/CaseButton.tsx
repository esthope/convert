import {ReactElement} from "react";

interface CaseProp {
	content:string|Function,
	onClick?:Function,
	onMouseEnter?:Function,
	disabled?:boolean,
	className?:string
}

const CaseButton = ({content, onClick, onMouseEnter, disabled, className}:CaseProp): ReactElement => {

	let additionalStyle = className ?? 'green-background flex-center';

	const properties:CaseProp[] = []

	if (onClick) properties['onClick'] = onClick;
	if (onMouseEnter) properties['onMouseEnter'] = onMouseEnter;
	if (disabled) properties['disabled'] = disabled;

	return (
		<button
			type="button"
			className={`caseButtonBase caseButton ${additionalStyle}`}
			{...properties}
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