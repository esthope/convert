import {Message} from 'constant/interfaces';

export const initialMessage:Message = {
	level: null,
	message: null,
	displayed: null
}

export const create_error = (message:string):Message => {
	return {
		level: 'error',
		message: message,
		displayed: true
	}
}

export const reset_alert = (setAlertMessage:Function):void => {
	setAlertMessage(initialMessage)
}

export const time_out = (miliseconds:number):Promise<any> => {
	return new Promise(resolve => setTimeout(resolve, miliseconds));
}