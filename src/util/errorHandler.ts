import {Message} from 'constant/interfaces';
import * as CustomMsg from 'constant/Messages';

const initialMessage:Message = {
	level: 'none',
	message: null,
	displayed: null,
	reset: false
}

const label_status:any = {
	error: CustomMsg.ERROR,
	warning: CustomMsg.WARNING
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

const get_boundary_error = (error:Error):Message => {
	const message = (error?.cause?.hasOwnProperty('fonite')) ? `${error.message}. ${CustomMsg.REF_IF_PERSIST}.` : `${CustomMsg.TECH_ERR}. ${CustomMsg.REFRESH}.`; 
    return create_error(message, true);
}

const is_message = (result:Message|any):boolean => {
	return !!(typeof result === 'object' && result?.level?.length > 0);
}

export {initialMessage, label_status, create_warning, create_error, reset_alert, get_boundary_error, is_message}