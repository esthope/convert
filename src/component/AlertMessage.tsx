// main
import {ReactElement, useState, useEffect, useContext} from 'react';
// util
import {MessageContext} from 'service/context';
import {reset_alert, label_status} from 'util/errorHandler';
import error_icon from 'assets/error.svg';
import warn_icon from 'assets/warn.svg';
import close_icon from 'assets/close.svg';
// element
import {REFRESH_PAGE} from 'constant/Messages';
import {Message} from 'constant/interfaces';
import CircleIcon from 'component/icons/CircleIcon';
import ErrorRefreshButton from 'component/ErrorRefreshButton';

const AlertMessage = ():ReactElement => {

	const 
		[setAlertMessage, alertMessage] = useContext(MessageContext),
		[messageIcon, setMessageIcon] = useState<string>(error_icon),
		[hidingDelay, setHidingDelay] = useState<number>(0),
		[interval, setCurrentInterval] = useState<any>(),
		[keep, setKeap] = useState<boolean>(false)
		;

	const {level, message, displayed, reset} = alertMessage;

	let displayed2 = true

	/**
	 * [CALL]
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
			console.log('bip')
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
	useEffect(() => {
		if (!keep && displayed === true) {
			trigger_hiding_alert()
		}

		return () => {
			clearInterval(interval)
			setCurrentInterval(null)
		}
	// eslint-disable-next-line
	}, [keep, displayed])

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
	}, [hidingDelay, interval, keep])/*[CALL], change_displayed_state])

	/**
	 * reset hiding delay of the alert when a new message is set
	 * @dependences {message} a new message appeared
	 */
	useEffect(() => {
	    setHidingDelay(0)

	    if (level === 'warning')
		{
			setMessageIcon(warn_icon)
		}
	}, [message]);

	return (
		<section id="message-container"
		onMouseEnter={()=>{if (typeof displayed === 'boolean') setKeap(true)}}
		onMouseLeave={()=>{setKeap(false)}}
		className="flex self-end no-wrap"
		>

			<div className={`gap-07 flex row fade-element ${(displayed) ? 'fade-animation':''}`}>
				<span className={`alert-level rozhaone-font ${level}-color`}>{label_status[level]}</span>

			    <p>
			    	{message}
					{!!reset && <a href="/" className="block mt-08">{REFRESH_PAGE}</a>}
			    </p>
			</div>

			<div 
			className="flex no-wrap"
			onMouseOver={()=>{if (displayed === false) {change_displayed_state(true)}}}
			>
		      	<img id="level-icon" src={messageIcon}
		      	alt={`Logo ${level}. Montrer le message.`}
		        />

	          	<button
				className={`customButton flex-center no-border no-bg fade-element ${
					(typeof displayed === 'boolean') ? 'fade-animation':'no-pointer'}`}
				onClick={close_alert}
				>
		      		<img src={close_icon} alt="Fermer le message" />
			    </button>
			</div>

		</section>
	)
}

export default AlertMessage;