import {ReactElement, memo} from "react";

const ResetSelectIcon = ():ReactElement => {
    return (
		<svg stroke="currentColor" strokeWidth="1.8"  fill="none" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="25px" width="25px" viewBox="0 0 25 25">
			<path d="M9,4c1.7,0,3,1.3,3,3v1 M12,17c0,1.7-1.3,3-3,3"/>
			<path d="M15,4c-1.7,0-3,1.3-3,3v1 M12,12v5c0,1.7,1.3,3,3,3"/>
			<path d="M5,5l14.1,13.9"/>
		</svg>
    )
}

const ResetSelectIconMemo = memo(ResetSelectIcon);
export default ResetSelectIconMemo;