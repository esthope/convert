import {useState, useEffect} from 'react';
import {ReactElement} from "react";
import CircleIncon from "assets/circle.svg"

const ActionButton = ({icon, label, onClick}:{icon:string, label?:string, onClick:any}):ReactElement => {

	const [iconPath, setIconPath] = useState<string>(CircleIncon);

	useEffect(()=>{
		const promise = import(`../assets/${icon}.svg`)
		promise.then((image) => {
			setIconPath(image.default)
		})
	})

	return (
		<button
			type="button"
			onClick={onClick}
			className=" actionButton labelContainer flex-center no-border no-bg"
		>
        	<img src={iconPath} className="" alt={label} />
			<label className=" ">{label}</label>
	    </button>
	)
}

export default ActionButton;