import {Message} from 'constant/interfaces';

const initialMessage:Message = {
	level: null,
	message: null,
	displayed: null
}


const create_message = (level:string, message:string):Message => {
	return {
		level: 'warning',
		message: message,
		displayed: true
	}
}

const create_warning = (message:string):Message => {
	return create_message('warning', message)
}

const create_error = (message:string):Message => {
	return create_message('error', message)
}

const reset_alert = (setAlertMessage:Function):void => {
	setAlertMessage(initialMessage)
}

const time_out = (miliseconds:number):Promise<any> => {
	return new Promise(resolve => setTimeout(resolve, miliseconds));
}

export {initialMessage, create_warning, create_error, reset_alert, time_out}