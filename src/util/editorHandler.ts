import {convertToRaw, convertFromRaw, EditorState, ContentState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';

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

export const initSelection = (editorState:EditorState):void => {
	const selectionLength = editorState?.getSelection()?.getFocusOffset(),
		  documentSel = document.getSelection();

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

export const getContentLength = (currentContent:ContentState):number => {
	let textLength = 0;

	const blocks = currentContent.getBlocksAsArray();
	blocks.forEach((block) => {
		textLength += block.getLength();
	})

	return textLength;
}