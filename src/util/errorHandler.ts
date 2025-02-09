import {Message} from 'constant/interfaces';

export const reset_alert = (setAlertMessage:Function):void => {
	setAlertMessage(initialMessage)
}

export const initialMessage:Message = {
	type:undefined,
	message:undefined,
	displayed: null
}