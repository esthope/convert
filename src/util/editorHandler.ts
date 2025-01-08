import {convertToRaw, convertFromRaw, EditorState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';

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