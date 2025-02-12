import {ContentState, EditorState} from "draft-js";
import {Selection, Interaction, Block, Message} from 'constant/interfaces';
import {Case, Action} from 'constant/Interactions';

// util
import {create_error} from 'util/errorHandler';
import {getRaws, getSelection, createContent, clearContent} from 'util/editorHandler';


let currentBlock:any,
	workText:string,
	newText = '',
	anchor = 0,
	errorMsg:Message
	;

const addLastIteration = () => {
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
				addLastIteration();
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
			addLastIteration();
		}
	})
	
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

/**
 * Choose the case treatment depending of the selected action
 * Change case, then updtate states
 * @param  {string} action 	constant from interactions
 */
export const updateTextCase = (action:string, editorState:any):any => {
	const currentRaws = getRaws(editorState),
		  {blocks} = currentRaws;

	const selections = getSelection(blocks, editorState)
	console.log(action)

	try
	{
		if (selections.length > 0) 
		{
	  		transformTexts(selections, blocks, undefined, action);
		}
		else
		{
		  	blocks.forEach((block:Block):void => {
		  		// verify text
				if (typeof block.text !== 'string' || block.text === '') return;

				// change text case
		  		block.text = changeCase(action, block.text)
		  	})

		}

		return createContent(currentRaws);
  	}
	catch (err)
	{
		// [ERR] return type err
		errorMsg = create_error(`Le texte n'a pas pu être mis à jour : ${err}`)
	}
}

/**
 * Excecute the user action
 * Update the editor content and/or use the clipboard
 * @param  {string} action code to decide the action to excecute
 */
export const clipboardAction = async (action:string, editorRef:any):Promise<any> =>
{
	const {clipboard} = navigator;
	let pastPromise:any = null,
		nexContent:any;

	switch (action)
	{
		case Action.copy:
		case Action.cut:
			let currentContent = editorRef.current.editor.innerText;
			if (!(currentContent == '\n'))
				clipboard.writeText(currentContent).catch ((err:any) => {/*[ERR]*/});;
			break;
		case Action.past:
			nexContent = await clipboard.readText().then((text:any) => createContent(text)).catch ((err:any) => {/*[ERR]*/});
			break;
	}

	if (action === Action.reset || action === Action.cut)
		nexContent = clearContent();

	return nexContent;
}