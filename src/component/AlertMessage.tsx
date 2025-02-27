// main
import {ReactElement, useState, useEffect, useContext} from 'react';
// util
import {MessageContext} from 'service/context';
import {reset_alert/*, time_out*/} from 'util/errorHandler';
import prov_logo from 'assets/circle.svg';
// element
import {Message} from 'constant/interfaces';
import CircleIcon from 'component/CircleIcon';
import ErrorRefreshButton from 'component/ErrorRefreshButton';

const AlertMessage = ():ReactElement => {

	const 
		[alertMessage, setAlertMessage] = useContext(MessageContext),
		[hidingDelay, setHidingDelay] = useState<number>(0),
		[interval, setCurrentInterval] = useState<any>(),
		[keep, setKeap] = useState<boolean>(false)
		;

	const {/*level, */message, displayed, reset} = alertMessage;

	/**
	 * control the display of the message
	 * @param  {isDisplayed} current diplay statut
	 */
	const change_displayed_state = (isDisplayed:boolean):void => {
		setAlertMessage((current:any):Message => {
	        return {
	          level: current.level,
	          message: current.message,
	          displayed: isDisplayed,
	          reset: current.reset
	        }
	    })
	}

	/**
	 * close completely the alert by reseting it 
	 */
	const close_alert = ():void => {
		setKeap(false)
		setHidingDelay(0)
		reset_alert(setAlertMessage)
	}

	/**
	 * trigger alert masking by increasing the delay
	 */
	const trigger_hiding_alert = ():void => {
		setCurrentInterval(setInterval(():void => { 
			setHidingDelay((current:any):number => {
		        return current+1
		    })
		}, 1000))
	}

	/**
	 * re.start automaticaly the alert hiding
	 * @dependences {displayed} change the displayed status if it's active
	 * @dependences {keep} 		hide if the component are not overed anymore
	 */
	useEffect( () =>{
		if (!keep && displayed === true) {
			trigger_hiding_alert()
		}
	}, [displayed, keep])


	/**
	 * manage alert hiding
	 * @dependences {hidingDelay} when the delay is updated by the interval or when it's reset
	 * @dependences {interval} 	  when the interval is changed
	 */
	useEffect(()=>{
		// when 10s as passed, hide
		if (hidingDelay === 10 && !keep) 
		{
			clearInterval(interval)
			change_displayed_state(false)
			setHidingDelay(0)
		}

		// if the commponent are overed, keep them displayed
		if (hidingDelay > 0 && keep) 
		{
			clearInterval(interval)
		}

  	// eslint-disable-next-line
	}, [hidingDelay, interval, change_displayed_state])

	/**
	 * reset hiding alert with a new message
	 * @dependences {message} a new message appeared
	 */
	useEffect(() => {
	    setHidingDelay(0)
	}, [message]);

	return (
		<section
			id="message-container" 
			onMouseEnter={()=>{if (typeof displayed === 'boolean') {console.log('in');setKeap(true)}}}
			onMouseLeave={()=>{setKeap(false)}}
			className="flex">
			<div className={`flex row-reverse gap-1 fade-element ${(displayed) ? 'fade-animation':''}`}>
	      		<img src={prov_logo} alt="message logo" />
				{!!reset && <ErrorRefreshButton />}
				{/*{!!reset && <a href='/'>Rafraichir</a>}*/}
      			<p className="">{message}</p>
			</div>
          	<button
				type="button"
				onMouseOver={()=>{if (displayed === false) {change_displayed_state(true)}}}
				className={`customButton flex-center no-border no-bg close-btn fade-element ${
					(typeof displayed === 'boolean') ? 'fade-animation':'no-pointer'}`}
				onClick={close_alert}
				>
				<CircleIcon color="#fff" />
		    </button>
		</section>
	)
}

export default AlertMessage;