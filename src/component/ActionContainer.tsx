// main
import {ReactElement, useContext} from "react";
import {EditorState} from 'draft-js';
// util
import {EditorContext} from 'service/context';
import {createContent} from 'util/editorHandler';
// element
import ActionButton from 'component/ActionButton';
import {Action} from 'constant/Cases';

const actions = [
	{ content: 'copy', action: Action.copy },
	{ content: 'past', action: Action.past },
	{ content: 'cut', action: Action.cut },
	{ content: 'reset', action: Action.reset },
	// { content: 'undo', action: Action.undo },
	// { content: 'redo', action: Action.redo },
	// { content: 'multi', action: Action.multi }
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
	 * @param  {string} action code to decide the action we will do
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
	<section className="square-container flex">
  	{
		actions.map((property, index)=>
			<ActionButton
				key={index}
				content={property.content}
				onClick={() => clipboardAction(property.action)} />
		)
	}
	</section>
)}

export default ActionContainer;