import {ReactElement} from "react";

const ActionButton = ({label, onClick, icon}: {label:string, onClick:any, icon:string}):ReactElement => {

	return (
		<button
			type="button"
			onClick={onClick} 
			className="bb actionButton labelContainer flex-center no-border no-bg"
		>
        	<img src={icon} className="bb" alt={label} />
			<label className="bb ">{label}</label>
	    </button>
	)
}

export default ActionButton;