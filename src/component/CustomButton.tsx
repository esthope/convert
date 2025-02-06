import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const CustomButton = ({onClick, color}:{onClick:any, color?:string}):ReactElement => {
	return (
		<button
			type="button"
			className="customButton flex-center no-border no-bg"
			onClick={onClick} >
			<CircleIcon color={color} />
	    </button>
	)
}

export default CustomButton;