import {ReactElement, memo} from "react";

const MultiIcon = ():ReactElement => {
    return (
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="25px" width="25px" viewBox="0 0 25 25">
		<path d="M13.3,17.2c0,1.3,1,2.3,2.3,2.3h1.6c0.4,0,0.8,0.3,0.8,0.8s-0.3,0.8-0.8,0.8h-1.6c-1.2,0-2.4-0.6-3.1-1.6 c-0.7,1-1.9,1.6-3.1,1.6H7.8c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h1.6c1.3,0,2.3-1,2.3-2.3V7.8c0-1.3-1-2.3-2.3-2.3H7.8 C7.4,5.5,7,5.1,7,4.7s0.3-0.8,0.8-0.8h1.6c1.2,0,2.4,0.6,3.1,1.6c0.7-1,1.9-1.6,3.1-1.6h1.6c0.4,0,0.8,0.3,0.8,0.8s-0.3,0.8-0.8,0.8 h-1.6c-1.3,0-2.3,1-2.3,2.3V17.2z"/>
		<path opacity="0.2" d="M17.2,4.7v15.6h-1.6c-1.7,0-3.1-1.4-3.1-3.1c0,1.7-1.4,3.1-3.1,3.1H7.8V4.7h1.6c1.7,0,3.1,1.4,3.1,3.1 c0-1.7,1.4-3.1,3.1-3.1H17.2z"/>
	</svg>
    )
}

const MultiIconMemo = memo(MultiIcon);
export default MultiIconMemo;