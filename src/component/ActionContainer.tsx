// main
import {ReactElement, useContext} from "react";
import {EditorState} from 'draft-js';
// util
import {EditorContext} from 'service/context';
import {createContent} from 'util/editorHandler';
// element
import ActionButton from 'component/ActionButton';
import {Action} from 'constant/UserInteraction';

const actions = [
	{ label: 'copy', action: Action.copy },
	{ label: 'past', action: Action.past },
	{ label: 'cut', action: Action.cut },
	{ label: 'reset', action: Action.reset },
	// { label: 'undo', action: Action.undo },
	// { label: 'redo', action: Action.redo },
	// { label: 'multi', action: Action.multi }
]

const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

	const [editorState, setEditorState] = useContext(EditorContext);

	/**
	* Clear the editor content
	*/
	const clearContent = ():void => {
		if (contentLength === 0) return;
		const initialState = EditorState.createEmpty();
		setEditorState(initialState)
	}

	/**
	 * Excecute the user action
	 * Update the editor content and/or use the clipboard
	 * @param  {string} action code to decide the action to excecute
	 */
	const clipboardAction = (action:string):void =>
	{
		const {clipboard} = navigator;
		let promise:any = null;

		switch (action)
		{
			case Action.copy:
			case Action.cut:
				let currentContent = editorState.getCurrentContent().getPlainText();
				promise = clipboard.writeText(currentContent)
				break;
			case Action.past:
				promise = clipboard.readText()
				break;
		}

		if (promise) 
		{
			promise.then((text:Event) => {
				if (typeof text === 'string') 
				{
					setEditorState(createContent(text))
				}
			}).catch((err:any) => {
				// [!] MSG
				console.log(err)
			})
		}

		if (action === Action.reset || action === Action.cut) 
			clearContent()
	}

  return (
	<section className="caseContainer flex">
  	{
		actions.map((property, index)=>
			<ActionButton
				key={index}
				label={property.label}
				onClick={() => clipboardAction(property.action)} />
		)
	}
	</section>
)}

export default ActionContainer;