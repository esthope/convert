import {ContentState, EditorState} from "draft-js";
import {Selection, Block, Message} from 'constant/interfaces';
import {Case, Action} from 'constant/Interactions';

// util
import {create_error} from 'util/errorHandler';
import {getRaws, getSelection, getBlock, createContent, clearContent} from 'util/editorHandler';


let currentBlock:any,
	workText:string,
	newText = '',
	initial = 0,
	errorMsg:Message
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

export const transformMultiLine = (selections:Selection[], editorState:any, caseAction:string, value?:string):void => {
	let anchorText:any,
		endingText:any
	
	let selectedText = document?.getSelection()?.toString();
	selections.forEach((selection, index):void => {
		const {anchor_key, offset, length, ending_key, ending_set, ending_len} = selection;

		if (!ending_key || !ending_len) return;
		
		anchorText = getBlock(anchor_key, editorState).getText();
		endingText = getBlock(ending_key, editorState).getText();

		if (!selectedText) {
			selectedText = anchorText.slice(offset, offset + length) + '\n';
			selectedText += endingText.slice(0, 0 + ending_len)
		}

		value = changeCase(caseAction, selectedText);
		newText = anchorText.slice(initial, offset) + value + endingText.slice(0 + ending_len);
	})

	workText = ''
	newText=''
	initial=0

	// return newText;
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
	let nexContent:any;

	switch (action)
	{
		case Action.copy:
		case Action.cut:
			let currentContent = editorRef.current.editor.innerText;
			if (!(currentContent === '\n'))
				clipboard.writeText(currentContent).catch ((err:any) => {/*[ERR]*/});;
			break;
		case Action.past:
			// [ERR] type warning si rien n'a coller
			nexContent = await clipboard.readText().then((text:any) => createContent(text)).catch ((err:any) => {/*[ERR]*/});
			break;
	}

	if (action === Action.reset || action === Action.cut)
		nexContent = clearContent();

	return nexContent;
}