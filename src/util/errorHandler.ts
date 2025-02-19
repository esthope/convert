import {Message} from 'constant/interfaces';
import * as CustomMsg from 'constant/Messages';

const initialMessage:Message = {
	level: null,
	message: null,
	displayed: null,
	reset: false
}

const create_message = (level:string, message:string, reset?:boolean):Message => {
	return {
		level: level,
		message: message,
		displayed: true,
		reset
	}
}

const create_warning = (message:string):Message => {
	return create_message('warning', message, false)
}

const create_error = (message:string, reset?:boolean):Message => {
	let displayReset = (typeof reset !== 'boolean') ? false : reset;
	return create_message('error', message, displayReset)
}

const reset_alert = (setAlertMessage:Function):void => {
	setAlertMessage(initialMessage)
}

const time_out = (miliseconds:number):Promise<any> => {
	return new Promise(resolve => setTimeout(resolve, miliseconds));
}

const get_boundary_error = (error:Error):Message => {
	const message = (error?.cause?.hasOwnProperty('fonite')) ? `${error.message} ${CustomMsg.REFRESH}` : `${CustomMsg.TECH_ERR} ${CustomMsg.REFRESH}`; 
    return create_error(message, true);
}

export {initialMessage, create_warning, create_error, reset_alert, time_out, get_boundary_error}