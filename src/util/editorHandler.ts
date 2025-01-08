import {convertToRaw, convertFromRaw, EditorState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';

export const getCurrentRaws = (editorState:EditorState):Raw => {
	const contentState = editorState.getCurrentContent(),
		  currentRaws = convertToRaw(contentState);
	return currentRaws;
}

export const getBlock = (blockKey:string, editorState:EditorState):any => {
	const currentRaws = getCurrentRaws(editorState),
		  block = currentRaws.blocks.find((block)=>block.key === blockKey);
	return block;
}

/**
 * [initContent description]
 * @type {[type]}
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
 * [formatSelection description]
 * @type {[type]}
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