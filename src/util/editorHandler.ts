import {convertToRaw, convertFromRaw, EditorState, ContentState} from "draft-js";
import {Raw, Selection, EditorSelection} from 'constant/interfaces';

export const createContent = (content:Raw|string):EditorState => {
	const contentState = (typeof content === 'string') ? ContentState.createFromText(content) : convertFromRaw(content);

	const documentSel = window.getSelection();
    if (documentSel) 
    {
    	documentSel.removeAllRanges();
    }

	return EditorState.createWithContent(contentState);

	/*return EditorState.create({
      currentContent: contentState,
      selection: SelectionState.createEmpty('4444')
    })*/
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
			blocks: [
			{
			    key: "11111",
			    text: "oğu zhan özyakup",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			},
			{
			    key: "22222",
			    text: "OUI àäâa èee éee ùuu",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			},
			{
			    key: "3333",
			    text: "OUI non OUI OUI non non",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			},
			{
			    key: "4444",
			    text: "OUI àäâa èee oğuzhan özyakup",
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

	// classic selection
	const editorSel = editorState.getSelection().toJS()
		// , classFocus = editorHasFocus();

	const {/*hasFocus, */anchorKey, anchorOffset, focusKey, focusOffset, isBackward} = editorSel;
	// [!] ? focus
	if ((selections.length <= 0) && (focusOffset !== anchorOffset)) 
	{
		let 
			startKey = (isBackward) ? focusKey : anchorKey,
			lastKey = (isBackward) ? anchorKey : focusKey,
			offset = (isBackward) ? focusOffset : anchorOffset,
			lastSet = (isBackward) ? anchorOffset : focusOffset,
			checkKey = startKey,
			length = 0,
			done = false

		const content = editorState.getCurrentContent()
		blocks.forEach((block, index):void => {

			if (done || (block.key !== checkKey)) return;

			switch (checkKey) {
				case startKey:
					length = block.text.length - offset
					break;
				case lastKey: 
					offset = 0
					length = lastSet
					break;
				default:
					offset = 0
					length = block.text.length
					break;
			}

			selections.push({
				anchor_key: block.key,
				offset,
				length
			})

			if (checkKey !== lastKey)
				checkKey = content.getBlockAfter(checkKey)?.getKey();
			else
				done = true
		})
	}

	return selections;
}

/**
 * Get and format a selection
 * @param  {editorState} 	editorSel : current editor state
 * @return {Selection} 		formatted selection
 */
export const formatSelection = (editorState:EditorState, editorSel:EditorSelection):Selection[] => {
	const {anchorKey, anchorOffset, focusKey, focusOffset, isBackward} = editorSel;

	let 
		formated:Selection[] = [],
		anchor_block_len = 0,
		length = focusOffset - anchorOffset, // length of selection = the focus position - the anchor position
		isMultiline = anchorKey !== focusKey

	// handle multiline selection
	if (isMultiline) {
		let start_key = (isBackward) ? focusKey : anchorKey,
			start_set = (isBackward) ? focusOffset : anchorOffset
		anchor_block_len = getBlock(start_key, editorState).text.length
		length = anchor_block_len - start_set; // length of selection = text length - starting set

		formated.push({
			anchor_key: (isBackward) ? anchorKey : focusKey,
			offset: 0,
			length: (isBackward) ? anchorOffset : focusOffset
		})
	}

	// base of the selection
	formated.push({
		anchor_key: (isBackward) ? focusKey : anchorKey,
		offset: (isBackward) ? focusOffset : anchorOffset,
		length
	})

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