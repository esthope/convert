// main
import {RefObject} from "react";
// util
import {addContent, activePrecedent} from 'service/historySlice'
import {createContent} from 'util/editorHandler'
// type
import {Editor, EditorState} from 'draft-js';
import {Message} from 'constant/interfaces';


export const addContentHistory = (dispatch:Function, editorRef:RefObject<Editor>):void => {
	if (!(editorRef.current && editorRef.current.editor)) return 
  const content = editorRef.current.editor.innerText
  dispatch(addContent(content))
}

export const activeLastHistory = (dispatch:Function):void=>{
  dispatch(activePrecedent())
}

export const undoContent = (stateHistory:Array<any>):EditorState|Message=>{
	const activeHistory = stateHistory.find((history:any)=>history.active)
  console.log(activeHistory.content)
	return createContent(activeHistory.content)
}