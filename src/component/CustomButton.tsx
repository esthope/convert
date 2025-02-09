import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const CustomButton = ({onClick, color, className}:{onClick:any, color?:string, className?:string}):ReactElement => {
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