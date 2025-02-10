import {ContentState} from "draft-js";
import {Selection, Interaction} from 'constant/interfaces';
import {Case} from 'constant/interactionKey';

let currentBlock:any,
	workText:string,
	newText = '',
	anchor = 0;

const updateText = () => {
	newText += workText.slice(anchor);
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
		selectedText:string;

	selections.forEach((selection, index):void => {
		const {offset, length, block_key} = selection;

		if (block_key)
		{
			// For the last iteration : add the rest of its sentence, then update
			if (newText !== '') 
			{
				updateText();
			}

			// get the current block with its passed key
			currentBlock = blocks.find((block)=>block.key === block_key);
			workText = currentBlock.text;

			// init
			newText = '';
			anchor = 0;
		}

		// case mode
		if (caseAction)
		{
			selectedText = workText.slice(offset, offset + length);
			value = changeCase(caseAction, selectedText);
		}

		// get the section and add the replacing text
		newText += workText.slice(anchor, offset) + value;
		// define the start position for next|last iteration
		anchor = offset + length;

		// on last iteration, add the rest of the sentence, then update
		if (selectionsLength === (index+1))
		{
			updateText();
		}
	})
	
}

/**
 * Change the case with more option
 * @param  {string} action 	constant from interactionKey
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
export const changeCase = (action:string, text:string):string => {
	switch (action) {
		case Case.upper:
			text = text.toUpperCase();
			break;
		case Case.lower:
			text = text.toLowerCase();
			break;
		default:
			text = changeComplexCase(action, text);
	}

	return text;
}

export const getContentLength = (currentContent:ContentState):number => {
	return currentContent.getPlainText().length
}

export const handle_press = (event:any, keys:string[], interactions:Interaction[]):void => {
	try
	{
		// get the needed properties
		const {key, type, ctrlKey, shiftKey} = event;
		let interKey:string,
			pressedKey = key.toLowerCase()

		if (pressedKey !== 'control') console.log(event)

		// check shorcut
		if (!keys.includes(pressedKey))
		{
			console.log('bloup')
			return
		}

		// select action
		const interaction_id = interactions.filter((inter) => {
			interKey = inter.key.toLowerCase(); 
			return interKey === pressedKey
		})
		console.log(interaction_id)
	}
	catch(err)
	{
		// [!] ERR
		console.log(err)
	}
}