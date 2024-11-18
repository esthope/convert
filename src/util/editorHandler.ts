import {convertToRaw, convertFromRaw, EditorState} from "draft-js";
import {Raw} from 'constant/interfaces';

export const getCurrentRaws = (editorState:EditorState):Raw => {
	const contentState = editorState.getCurrentContent(),
		  currentRaws = convertToRaw(contentState);
	
	return currentRaws;
}

export const initContent = (changeRaws:Function) => {

	const initialState = EditorState.createWithContent(
		convertFromRaw({
		blocks: [
			{
			    key: "9adb5",
			    text: "OUI non OUI OUI non non OUI àäâa èee éee ùuu oğuzhan özyakup",
			    type: "",
			    depth: 0,
			    inlineStyleRanges: [],
			    entityRanges: [],
			    data: {},
			},
		],
		entityMap: {}
		})
	)

	const initialContent = initialState.getCurrentContent();
	changeRaws(convertToRaw(initialContent))
}