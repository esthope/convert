import {ReactElement} from "react";
import Circle from 'component/Circle';

const TestButton = ({onClick, color}:{onClick:any, color?:string}):ReactElement => {
	return (
		<button
			type="button"
			className="test-button flex-center"
			onClick={onClick} >
			<Circle color={color} />
	    </button>
	)
}

export default TestButton;