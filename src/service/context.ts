import {EditorState} from "draft-js";
import {createContext} from "react";
// import {initialMessage} from "util/errorHandler";

const MessageContext = createContext<any>(null)

const editorState = EditorState.createEmpty(),
	EditorContext = createContext<any>(editorState);

export {EditorContext, MessageContext}