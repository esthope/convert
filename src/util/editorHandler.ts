import {convertToRaw, EditorState} from "draft-js";
import {Raw} from 'constant/interfaces';

export const getCurrentRaws = (editorState:EditorState):Raw => {
	const contentState = editorState.getCurrentContent(),
		  currentRaws = convertToRaw(contentState);
	
	return currentRaws;
}