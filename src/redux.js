import {createSlice, configureStore} from '@reduxjs/toolkit';
import {EditorState} from "draft-js";

const editorSlice = createSlice({
	name: 'editorState',
	initialState: EditorState.createEmpty(),
	reducers: {
		// {type: 'editorState/updateContent', payload: newEditorState}
		updateContent: (state, action) => {
			state = action.payload
		},
		resetContent: (state, action) => {
			state = EditorState.createEmpty()
		},
		initTestContent: (state, action) => {
			state = EditorState.createWithContent(
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

			/*const initialContent = initialState.getCurrentContent();
			changeRaws(convertToRaw(initialContent)) // raws

			const contentRaws = convertFromRaw(raws);
    		setEditorState(EditorState.createWithContent(contentRaws));*/
		}
	}
})

export const store = configureStore({
	reducer: {
		editorState: editorSlice.reducer
	}
})