import {ContentState} from "draft-js";
import {Selection, Block} from 'constant/interfaces';
import {Case, Action} from 'constant/Interactions';

// util
import * as CustomMsg from 'constant/Messages';
import {create_error, create_warning, is_message} from 'util/errorHandler';
import {getRaws, getSelection, createContent, clearContent} from 'util/editorHandler';

let currentBlock:any,
	whiteReg = new RegExp('^\\s+$', 'g'),
	workText:string,
	newText:string|undefined = '',
	initial = 0,
	errorMsg:string
	;

const addLastIteration = () => {
	newText += workText.slice(initial);
	currentBlock.text = newText;
}

/**
 * Split the selection, then concat with chosen text
 * @param  {array} 	selections 	All positions of the selection
 * @param  {array} 	blocks 		the text blocks from Draftjs
 * @param  {string} value 		A changed text for case update

 */
export const transformTexts = (selections:Selection[], blocks:any[], value?:string, caseAction?:string):void => {
	let selectionsLength = selections.length,
		selectedText:string,
		focus:number = 0;

	selections.forEach((selection, index):void => {
		const {offset, length, anchor_key} = selection;
		focus = offset + length;

		if (anchor_key)
		{
			// For the last iteration : add the rest of its sentence, then update
			if (newText !== '') 
			{
				addLastIteration();
			}

			// get the current block with its passed key
			currentBlock = blocks.find((block)=>block.key === anchor_key);
			workText = currentBlock.text;

			// init
			newText = '';
			initial = 0;
		}

		// case mode
		if (caseAction)
		{
			selectedText = workText.slice(offset, focus);
			value = changeCase(caseAction, selectedText);
		}

		// get the section and add the replacing text
		newText += workText.slice(initial, offset) + value;
		// define the start position for next|last iteration
		initial = focus;

		// on last iteration, add the rest of the sentence, then update
		if (selectionsLength === (index+1))
		{
			addLastIteration();
		}
	})

	workText = ''
	newText=''
	initial=0
}

/**
 * Change the case with more option
 * @param  {string} action 	constant from interactions
 * @param  {string} text 	text to change
 * @return {string} 		changedText changed text
 */
export const changeComplexCase = (action:string, text:string):string => {
	let changedText:string = '',
		caseRegex:RegExp = /./g,
		lowerRegex = new RegExp('\\p{Lower}', 'u');

	// camel case and capitalize
	if (action === Case.camel || action === Case.capital) {
		changedText = text.toLowerCase();
		caseRegex = (action === Case.camel) ? /\s\p{Letter}/gu : /(^|\s)\p{Letter}/gu;
	}

	// case inversion
	if (action === Case.inversion) {
		changedText = text;
		caseRegex = /\p{Letter}/gu;
	}

	// change text
	if (changedText) 
	{
		changedText = changedText.replaceAll(caseRegex, (letter:string):string => (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase());
		// delete whitespaces for camel case
		if (action === Case.camel) changedText = changedText.replaceAll(/\s/g, '');
	}
	return changedText;
}

/**
 * [description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export const changeCase = (caseID:string, text:string):string => {

	// verify text
	if (typeof text !== 'string' || text === '' || whiteReg.test(text)) return text;

	// change text
	let changedText = undefined;
	switch (caseID) {
		case Case.upper:
			changedText = text.toUpperCase();
			break;
		case Case.lower:
			changedText = text.toLowerCase();
			break;
		default:
			changedText = changeComplexCase(caseID, text);
	}

	if (!changedText) {
		errorMsg = CustomMsg.TEXT_UP;
		return text
	}

	return changedText;
}

export const getContentLength = (currentContent:ContentState):number => {
	return currentContent.getPlainText().length
}

/**
 * Choose the case treatment depending of the selected action
 * Change case, then updtate states
 * @param  {string} action 	constant from interactions
 */
export const updateTextCase = (action:string, editorState:any, setAlertMessage:Function):any => {
	const currentRaws = getRaws(editorState),
		  {blocks} = currentRaws

	const selections = getSelection(blocks, editorState)

	try
	{
		if (selections.length > 0) 
		{
	  		transformTexts(selections, blocks, undefined, action);
		}
		else
		{
			// change text case
		  	blocks.forEach((block:Block):void => {
		  		block.text = changeCase(action, block.text)
		  	})
		}

		// if an error occured, do not stop treatment by throwing
		if (errorMsg) {
			setAlertMessage(create_warning(errorMsg))
		}

		return createContent(currentRaws);
  	}
	catch (err)
	{
		// [DEV]
		// console.log(err)
		return create_error(CustomMsg.TEXT_UNCHANGED)
	}
}

/**
 * Excecute the user action
 * Update the editor content and/or use the clipboard
 * @param  {string} action code to decide the action to excecute
 */
export const clipboardAction = async (action:string, editorRef:any):Promise<any> =>
{
	let newContent:any;
	const {clipboard} = navigator,
		  currEditor = editorRef.current?.editor;

	if (!currEditor) return;
	try
	{
		switch (action)
		{
			case Action.copy:
			case Action.cut:
				let currentContent = currEditor?.innerText;
				if (currentContent && !(currentContent === '\n'))
					newContent = await clipboard.writeText(currentContent)
					.catch ((err:any) =>/*DEV*/create_error(CustomMsg.COPY_ERR));
				break;
			case Action.past:
				newContent = await clipboard.readText()
				.then((text:any) => (text === '') ? create_warning(CustomMsg.NOTHING_PAST) : createContent(text))
				.catch ((err:any) =>/*DEV*/create_error(CustomMsg.PAST_ERR));
				break;
		}

		if (action === Action.reset || action === Action.cut)
			newContent = (is_message(newContent)) ? newContent : clearContent();
	}
	catch(err:any)
	{
		// [DEV]
		return create_error(CustomMsg.ACTION_FAILED)
	}

	return newContent;
}