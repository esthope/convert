import {ReactElement} from "react";
import CircleIcon from 'component/CircleIcon';

const CustomButton = ({onClick, color}:{onClick:any, color?:string}):ReactElement => {
	return (
		<button
			type="button"
			className="test-button flex-center"
			onClick={onClick} >
			<CircleIcon color={color} />
	    </button>
	)
}

export default CustomButton;