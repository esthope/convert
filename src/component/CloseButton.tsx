import {ReactElement, memo} from "react";

interface ButtonProp {
	onClick:any,
	text:string,
	logo:string,
	color?: string
}

const TextButton = ({onClick, text, logo, color}:ButtonProp):ReactElement => {
	return (
		<button
			type="button"
			className={`textButton no-border no-bg inline mr-2`}
			onClick={onClick} >
			{text} {color}
			<img src={logo} alt="Fermer"/>
	    </button>
	)
}

export default memo(TextButton);