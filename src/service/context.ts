import {EditorState} from "draft-js";
import {createContext} from "react";

const editorState = EditorState.createEmpty();
const EditorContext = createContext(editorState);
export default EditorContext;