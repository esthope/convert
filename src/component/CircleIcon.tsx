import {ReactElement} from "react";
import style from "constant/base.scss";

const colors:any = style;
const CircleIcon = ({color=colors.lightOrange, parentSize='21', ellipseSize='10'}:{color?:string, parentSize?:string, ellipseSize?:string}):ReactElement => {


	return (
	<svg height={parentSize} width={parentSize} xmlns="http://www.w3.org/2000/svg">
	  <ellipse rx={ellipseSize} ry={ellipseSize} cx={ellipseSize} cy={ellipseSize} fill={color} />
	</svg>
	)
}

export default CircleIcon;