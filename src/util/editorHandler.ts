import {convertToRaw, convertFromRaw, EditorState, ContentState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';
import {changeCase} from 'util/textHandler';

export const createContent = (content:Raw|string):EditorState => {
	const contentState = (typeof content === 'string') ? ContentState.createFromText(content) : convertFromRaw(content);
	return EditorState.createWithContent(contentState);
}

export const clearContent = ():EditorState => {
	return EditorState.createEmpty();
}

/**
 * For test, init the editor content
 * @param {Function} setEditorState : function to change the editor content
 */
export const initContent = (setEditorState:Function) => {

	const initialState = {
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
		}

	const newState = createContent(initialState)
	setEditorState(newState)
}

export const initSelection = (editorState:EditorState):void => {
	const selectionLength = editorState?.getSelection()?.getFocusOffset(),
		  documentSel = window.getSelection();

    if (selectionLength <= 0 && documentSel) 
    {
    	documentSel.removeAllRanges();
    }
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
		inlineStyleRanges[0].anchor_key = key;
		selections.push(...inlineStyleRanges)

		// empty the selection
		block.inlineStyleRanges = [];
	})

	// only one selection

	const editorSel = editorState.getSelection().toJS();

	if ((selections.length <= 0) && editorSel.hasFocus && (editorSel.focusOffset !== editorSel.anchorOffset)) 
	{
		let selectedText = document?.getSelection()?.toString();
		const formatted = [formatSelection2(editorState)];
		console.log(formatted)

		let anchorText:any,
			endingText:any,
			workText:string,
			newText='',
			value='',
			caseAction='LOW',
			initial=0
		
		formatted.forEach((selection, index):void => {
			const {anchor_key, offset, length, ending_key, ending_set, ending_len} = selection;
debugger
			if (!ending_key || !ending_len) return;
			
			anchorText = getBlock(anchor_key, editorState).getText();
			endingText = getBlock(ending_key, editorState).getText();

			if (!selectedText) {

				selectedText = anchorText.slice(offset, offset + length) + '\n';
				selectedText += endingText.slice(0, 0 + ending_len)
				value = changeCase(caseAction, selectedText);

				/*anchor_set > text_len
				\n
				0 > 0*/
			}

			newText = anchorText.slice(initial, offset) + value + endingText.slice(0 + ending_len);
		})

		// selections.push(formatSelection(editorSel));
	}

	return selections;
}

/**
 * Get and format a selection
 * @param  {editorState} 	editorSel : current editor state
 * @return {Selection} 		formatted selection
 */
export const formatSelection2 = (editorState:EditorState):Selection => {
	const editorSel = editorState.getSelection().toJS(),
		  {anchorKey, anchorOffset, focusKey, focusOffset, isBackward} = editorSel;

	let anchor_block_len = 0,
		length = focusOffset - anchorOffset, // length of selection = the focus position - the anchor position
		isMultiline = anchorKey !== focusKey

	// handle multiline selection
	if (isMultiline) {
		let start_k2ey = (isBackward) ? focusKey : anchorKey,
			start_set = (isBackward) ? focusOffset : anchorOffset
		anchor_block_len = getBlock(start_k2ey, editorState).text.length
		length = anchor_block_len - start_set; // length of selection = text length - starting ending_set
	}

	// base of the selection
	let formated:Selection = {
		anchor_key: (isBackward) ? focusKey : anchorKey,
		offset: (isBackward) ? focusOffset : anchorOffset,
		length
	}

	// ignored on one line selection
	if (isMultiline) {
		formated.ending_key = (isBackward) ? anchorKey : focusKey 
		formated.ending_set = 0
		formated.ending_len = (isBackward) ? anchorOffset : focusOffset
	}

	return formated;
}

/**
 * Get the current content of the editor, formatted to raws
 * @param  {EditorState} 	editorState : current editor state
 * @return {Raw} 			current raws containing the blocks
 */
export const getRaws = (editorState:EditorState):Raw => {
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
	/*const currentRaws = getRaws(editorState),
		  block = currentRaws.blocks.find((block)=>block.key === blockKey);*/

	const block = editorState.getCurrentContent().getBlockForKey(blockKey);
	return block;
}