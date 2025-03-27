// main
import {ReactElement, useContext, useEffect} from "react";
import {EditorContext, MessageContext} from 'service/context';
import {EditorState} from 'draft-js';
// util
import * as CustomMsg from 'constant/Messages';
import {is_message, create_error} from 'util/errorHandler';
import {clipboardAction} from 'util/textHandler';
import {Interaction} from 'constant/interfaces';
import {Action, actionsData} from 'constant/Interactions';
// element
import ActionButton from 'component/ActionButton';
import TemplateButton from './TemplateButton';

const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

  		  // eslint-disable-next-line
	const [editorState, setEditorState, editorRef] = useContext(EditorContext),
  		  // eslint-disable-next-line
  		  [alertMessage, setAlertMessage] = useContext(MessageContext)

	/**
	* Update the editor content
	*/
	const handleAction = async (action:string):Promise<void> => {

		try
		{
			// if (contentLength === 0) return;
			const newState = await clipboardAction(action, editorRef)

			// getting new state failed
			if (is_message(newState))
				throw newState

			if (newState instanceof EditorState)
				setEditorState(newState)
		}
		catch(err:any)
		{
			// ? [DEV]
			// console.log(err)
			let errorMsg = (is_message(err)) ? err : create_error(CustomMsg.ACTION_FAILED)
			setAlertMessage(errorMsg)
		}
	}

	useEffect(()=>{
  		if (actionsData.length === 0) {
  			throw new Error(CustomMsg.ACTIONS, {cause: {fonite:'ACTION'}})
  		}
	}, [])

	return (
		<section className="actionContainer flex">
  		{
			actionsData.map((item:Interaction):any => (
			  	(!item.unactive && Action.hasOwnProperty(item.entry))
			  	? <TemplateButton
					key={item.data_id}
					label={item.label}
					length={contentLength}
					shift={item.shift ?? false}
					board_key={item.key} >
					<ActionButton
						entry={item.entry}
						label={item.label}
						onClick={()=>handleAction(item.data_id)} />
				</TemplateButton>
			  	: null
			))
  		}
		</section>
	)
}
// const ActionContainerMemo = memo(ActionContainer);
export default ActionContainer;