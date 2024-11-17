import {convertToRaw} from "draft-js";
// construire type Block EditorStateType à partir du module ?

export const getCurrentRaws = (editorState:Object):Object => {
	const contentState = editorState.getCurrentContent(),
		  currentRaws = convertToRaw(contentState);
	
	return currentRaws;
}