// main
import {ReactElement, useContext} from "react";
import {EditorState} from 'draft-js';
// util
import {EditorContext} from 'service/context';
// import {getRaws, getSelection} from 'util/editorHandler';
// element
import ActionButton from 'component/ActionButton';
import {Action} from 'constant/Cases';
// import {Block} from 'constant/interfaces';

const actions = [
	{ content: 'copy', action: Action.copy },
	{ content: 'past', action: Action.past },
	{ content: 'cut', action: Action.cut },
	{ content: 'reset', action: Action.reset },
	{ content: 'undo', action: Action.undo },
	{ content: 'redo', action: Action.redo },
	{ content: 'multi', action: Action.multi }
]

const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

	const [editorState, setEditorState] = useContext(EditorContext);

	/**
	* Clear the editor content
	*/
	const clearContent = () => {
		if (contentLength === 0) return;
		const initialState = EditorState.createEmpty();
		setEditorState(initialState)
	}


  return (
	<section className="square-container flex">
  	{
		actions.map((property, index)=>
			<ActionButton
				key={index}
				content={property.content}
				onClick={() => {}} />
		)
	}
	</section>
)}

export default ActionContainer;