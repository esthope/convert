import {ReactElement, memo} from "react";

interface ButtonProp {
	children:any,
	onClick:any,
	text:string,
	color?: string
}

const TextButton = ({children, onClick, text, color}:ButtonProp):ReactElement => {
	return (
		<button
			type="button"
			className={`no-border no-bg mr-2 textButton ${color}`}
			onClick={onClick} >
			<p>{text}</p>
			{children}
	    </button>
	)
}

export default memo(TextButton);