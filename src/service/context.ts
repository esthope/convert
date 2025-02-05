import {EditorState} from "draft-js";
import {createContext} from "react";

const editorState = EditorState.createEmpty(),
	EditorContext = createContext<any>(editorState);

export {EditorContext}