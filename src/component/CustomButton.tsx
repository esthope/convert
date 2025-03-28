import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

interface ButtonProp {
	onClick:any,
	color?:string,
	className?:string,
	disabled?:boolean
}

const CustomButton = ({onClick, color, className, disabled}:ButtonProp):ReactElement => {
	return (
		<button
			type="button"
			className={`customButton flex-center no-border no-bg ${className}`}
			onClick={onClick} >
			<CircleIcon color={color} />
	    </button>
	)
}

export default CustomButton;