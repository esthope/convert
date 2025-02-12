// main
import {ReactElement, useContext, useEffect, useCallback, useMemo, memo} from "react";
import {EditorState} from 'draft-js';
// util
import {EditorContext, MessageContext} from 'service/context';
import {createContent} from 'util/editorHandler';
import {fetchData, getInteractionsKeys} from 'util/dataHandler';
import {Interaction} from 'constant/interfaces';
// element
import {Action} from 'constant/Interactions';
import ActionButton from 'component/ActionButton';
import TemplateButton from './TemplateButton';
// alert 
import {Message} from 'constant/interfaces';
import {create_error} from 'util/errorHandler';
let errorMsg:Message;

const actions = fetchData('actions');

const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

	const [editorState, setEditorState, editorRef] = useContext(EditorContext),
          [setAlertMessage] = useContext(MessageContext)

	/**
	* Clear the editor content
	*/
	const clearContent = (action:string):void => {
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
				let currentContent = editorRef.current.editor.innerText;
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
				// [ERR]
				errorMsg = create_error(`L'action n'a pas pu être effectuée : ${err}`)
				setAlertMessage(errorMsg)
			})
		}

		if (action === Action.reset || action === Action.cut) 
			clearContent(action);
	}

	return (
		<section className="actionContainer flex">
  		{
			actions.map((item:Interaction):any => (
			  	(!item.unactive)
			  	? <TemplateButton
					key={item.data_id}
					label={item.label}
					length={contentLength}
					shift={item.shift ?? false}
					board_key={item.key} >
					<ActionButton
						entry={item.entry}
						label={item.label}
						onClick={() => clipboardAction(item.data_id)} />
				</TemplateButton>
			  	: null
			))
  		}
		</section>
	)
}
// const ActionContainerMemo = memo(ActionContainer);
export default ActionContainer;