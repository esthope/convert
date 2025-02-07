// main
import {ReactElement, useContext} from "react";
import {EditorState} from 'draft-js';
// util
import {fetchData} from 'util/dataHandler';
import {createContent} from 'util/editorHandler';
import {Interaction} from 'constant/interfaces';
import {EditorContext} from 'service/context';
// element
import ActionButton from 'component/ActionButton';
import {Action} from 'constant/interactionKey';

const actions = fetchData('actions');

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
			clearContent();
	}

  return (
	<section className="actionContainer flex">
  	{
		actions.map((item:Interaction):any => {
		if (!item.unactive)
		return (
			<ActionButton
				key={item.data_id}
				icon={item.entry}
				label={item.label}
				board_key={item.key}
				onClick={() => clipboardAction(item.data_id)} />
		)})
	}
	</section>
)}

export default ActionContainer;