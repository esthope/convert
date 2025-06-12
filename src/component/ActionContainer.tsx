// main
import {ReactElement, useContext, useEffect, useRef, useCallback} from "react"
import {EditorContext, MessageContext} from 'service/context'
import {useSelector, useDispatch} from 'react-redux'
import {isMobile} from 'react-device-detect'
import {EditorState} from 'draft-js'
// util
import {activePreviousHistory, undoneContent, addContentHistory} from 'util/historyHandler'
import {is_message, create_cause, create_error} from 'util/errorHandler'
import {clipboardAction} from 'util/textHandler'
import {changeColor} from 'service/buttonSlice'
import * as Msg from 'constant/Messages'
// constant
import {Action, actionsData} from 'constant/Interactions'
import {Interaction} from 'constant/interfaces'
// element
import ActionButton from 'component/ActionButton'
import TemplateButton from './TemplateButton'

const location = 'C-ACTION'

const ActionContainer = ({started}:{started:boolean}): ReactElement => {
  	// eslint-disable-next-line
	const [editorState, setEditorState, editorRef] = useContext(EditorContext),
  		  [setAlertMessage] = useContext(MessageContext);

  	const stateHistory = useSelector((state:any)=>state.history),
  		  dispatch = useDispatch(),
  		  undo = useRef<boolean>(false)

	/**
	* Check the new content and Update the editor
	* @param [EditorState|Message] the new content or a message to be send
	* @param [string] the button entry for the color
	*/
  	const checkNewState = useCallback((newState:any, action:string) => {
  		try
		{
			let newText:string|undefined = undefined;

			// getting new state failed
			if (is_message(newState))
				throw newState

			// set new content
			if (newState instanceof EditorState) {
				setEditorState(newState)
				newText = newState.getCurrentContent().getPlainText()
      			addContentHistory(dispatch, editorRef, newText)
			}

			dispatch(changeColor(action + ' success-color-btn'))
		}
		catch(err:any)
		{
			const cause = create_cause('ACTION', location, err),
				  errorMsg = (is_message(err)) ? err : create_error(Msg.ACTION_FAILED, cause)

			dispatch(changeColor(action + ` ${err?.level ?? 'error'}-color-btn`))
			setAlertMessage(errorMsg)
		}
  	}, [dispatch, editorRef, setAlertMessage, setEditorState])

	/**
	* Handle the actions from buttons
	*/
	const handleAction = async (action:string):Promise<void> => {
		if (action === Action.undo) 
		{
			activePreviousHistory(dispatch)
			undo.current = true
			return
		}

		// if (contentLength === 0) return;
		const newState = await clipboardAction(action, editorRef)
		checkNewState(newState, action)
	}

	/**
	 * Set the new content from history
	 */
  	useEffect(()=>{
  		if (!undo.current) return

		const newState = undoneContent(stateHistory, dispatch)
		checkNewState(newState, Action.undo)

		undo.current = false
  	}, [checkNewState, stateHistory])

	useEffect(()=>{
  		if (actionsData.length === 0) {
			const cause = create_cause('ACTION', location, Msg.EMPTY_DATA)
  			throw new Error(Msg.ACTIONS, {cause: cause})
  		}
	}, [])

	return (
		<div className="actionContainer flex">
  		{
			actionsData.map((item:Interaction):any => (
			  	(!item.unactive && Action.hasOwnProperty(item.entry))
			  	? <TemplateButton
					key={item.data_id}
					label={item.label}
					started={started}
					shift={item.shift ?? false}
					board_key={item.key}
					is_mobile={isMobile}
					>
					<ActionButton
						actionID={item.data_id}
						label={item.label}
						onClick={()=>handleAction(item.data_id)} />
				</TemplateButton>
			  	: null
			))
  		}
		</div>
	)
}
// const ActionContainerMemo = memo(ActionContainer);
export default ActionContainer;