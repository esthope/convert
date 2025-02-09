// main
import {ReactElement, useState, useEffect, useContext} from 'react';
// util
import {MessageContext} from 'service/context';
import {reset_alert} from 'util/errorHandler';
import prov_logo from 'assets/circle.svg';

// import CustomButton from 'component/CustomButton';
import CircleIcon from 'component/CircleIcon';
import {Message} from 'constant/interfaces';

const AlertMessage = ():ReactElement => {
	const 
		[alertMessage, setAlertMessage] = useContext(MessageContext),
		[keap, setKeap] = useState<boolean>(false)
		;

	const {type, message, displayed} = alertMessage;

	// control the display of the message
	const change_displayed_state = (isDisplayed:boolean):void => {
		setAlertMessage({
			type: alertMessage.type,
			message: alertMessage.message,
			displayed: isDisplayed
		})
	}

	// close completely the msg by reseting it 
	const close_alert = ():any => {
		setKeap(false)
		reset_alert(setAlertMessage)
	}

	// hide automaticaly out focus and when the message is displayed, keep it available
	useEffect( () =>{
		if (!keap && displayed === true)
			setTimeout(()=>{
				change_displayed_state(false)
			}, 10000)
	}, [displayed, keap])

	return (
		<section
			id="message-container" 
			onMouseEnter={()=>{if (typeof displayed === 'boolean') {setKeap(true)}}}
			onMouseLeave={()=>{setKeap(false)}}
			className="flex">
			<div className={`flex row-reverse gap-1 fade-element ${(displayed) ? 'fade-animation':''}`}>
	      		<img src={prov_logo} alt="message logo" />
      			<p className="">{message}</p>
			</div>
          	<button
				type="button"
				onMouseOver={()=>{if (displayed === false) {change_displayed_state(true)}}}
				className={`customButton flex-center no-border no-bg close-btn fade-element ${
					(typeof displayed === 'boolean') ? 'fade-animation':'no-pointer'}`}
				onClick={close_alert} >
				<CircleIcon color="#fff" />
		    </button>
		</section>
	)
}

export default AlertMessage;