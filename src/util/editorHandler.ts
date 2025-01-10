import {convertToRaw, convertFromRaw, EditorState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';
import {changeCase} from 'util/caseHandler';
import {Mode} from 'constant/Cases';

export const startBlockReplacement = ():void => {

}

export const testFunctionDEux = ():void => {

}

/**
 * Split the selection, then concat with chosen text
 * @param  {array} 	selections 	All positions of the selection
 * @param  {array} 	blocks 		the text blocks from Draftjs
 * @param  {string} value 		A changed text for case update
 */
export const transformTexts = (selections:Selection[], blocks:any[], value?:string, mode?:string):void => {
	let selectionsLength = selections.length, 
		currentBlock:any,
		workText:string,
		selectedText:string,
		newText = '',
		anchor = 0;

	selections.forEach((selection, index):void => {
		const {offset, length, block_key} = selection;

		if (block_key)
		{
			// add the rest of the sentence, then update
			if (newText !== '') 
			{
				newText += workText.slice(anchor);
				currentBlock.text = newText;
			}

			// get the current block with its passed key
			currentBlock = blocks.find((block)=>block.key === block_key);
			workText = currentBlock.text;

			// init
			newText = '';
			anchor = 0;
		}

		// get the section and add the replacing text
		newText += workText.slice(anchor, offset) + value;
		// define the start position for next|last iteration
		anchor = offset + length;

		// get the selected string
		if (mode === Mode.case) 
		{
			// changeCase
		}

		selectedText = workText.slice(offset, anchor)
		console.log(selectedText)

		// on last iteration, add the rest of the sentence, then update
		if (selectionsLength === (index+1))
		{
			newText += workText.slice(anchor);
			currentBlock.text = newText;
		}
	})
}

/**
* Get all the selections of each Block
* @return {array} selection
*/
export const getSelection = (blocks:any[], editorState:EditorState):any[] => {

	let selections:Selection[] = [];

	// multi selections
	blocks.forEach((block, index):void => {
		const {key, inlineStyleRanges} = block;
		if (inlineStyleRanges.length <= 0) return;

		// add the block key to the first selection
		inlineStyleRanges[0].block_key = key;
		selections.push(...inlineStyleRanges)

		// empty the selection
		block.inlineStyleRanges = [];
	})

	// only one selection
	const editorSel = editorState.getSelection().toJS();
	if (selections.length <= 0 && (editorSel.focusOffset !== editorSel.anchorOffset)) 
	{
		selections.push(formatSelection(editorSel));
	}

	return selections;
}


/**
 * Get the current content of the editor, formatted to raws
 * @param  {EditorState} 	editorState : current editor state
 * @return {Raw} 			current raws containing the blocks
 */
export const getCurrentRaws = (editorState:EditorState):Raw => {
	const contentState = editorState.getCurrentContent(),
		  currentRaws = convertToRaw(contentState);
	return currentRaws;
}

/**
 * Get the object of a specific block
 * @param {string} 		blockKey : ID of the block we need
 * @param {EditorState}	editorState : current editor state
 * @return {object} 	block content
 */
export const getBlock = (blockKey:string, editorState:EditorState):any => {
	const currentRaws = getCurrentRaws(editorState),
		  block = currentRaws.blocks.find((block)=>block.key === blockKey);
	return block;
}

/**
 * For test, init the editor content
 * @param {Function} changeRaws : function to change the editor content
 */
export const initContent = (changeRaws:Function) => {

	const initialState = EditorState.createWithContent(
		convertFromRaw({
			blocks: [{
			    key: "9adb5",
			    text: "OUI non OUI OUI non non OUI àäâa èee éee ùuu",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			},{
			    key: "11111",
			    text: "oğuzhan özyakup",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			}],
			entityMap: {}
		})
	)

	const initialContent = initialState.getCurrentContent();
	changeRaws(convertToRaw(initialContent))
}

/**
 * Get and format a selection
 * @param  {EditorSelection} 	editorSel : current selection
 * @return {Selection} 			formatted selection
 */
export const formatSelection = (editorSel:EditorSelection):Selection => {
	const {anchorKey, anchorOffset, focusKey, focusOffset, isBackward} = editorSel;

	const formatedSel = {
		block_key: (isBackward) ? focusKey : anchorKey,
		ending_key: (isBackward) ? anchorKey : focusKey,
		offset: (isBackward) ? focusOffset : anchorOffset,
		length: (isBackward) ? (anchorOffset - focusOffset) : (focusOffset - anchorOffset)
	}

	return formatedSel;
}