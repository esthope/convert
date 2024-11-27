import {ReactElement} from "react";
import Circle from 'component/Circle';
import style from "constant/style.scss";

const TestButton = ({onClick, color}:{onClick:any, color?:string}):ReactElement => {
	const colors:any = style;

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