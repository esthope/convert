// main
import {ReactElement, useContext, useEffect, useRef, useCallback, useMemo, memo} from "react";
import {EditorState} from 'draft-js';
// util
import {EditorContext, MessageContext} from 'service/context';
import {clipboardAction} from 'util/textHandler';
import {fetchData, getInteractionsKeys} from 'util/dataHandler';
import {Interaction} from 'constant/interfaces';
// element
import ActionButton from 'component/ActionButton';
import TemplateButton from './TemplateButton';
// alert 
import {Message} from 'constant/interfaces';
import {create_error} from 'util/errorHandler';

const actions = fetchData('actions');

const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

	const [editorState, setEditorState, editorRef] = useContext(EditorContext),
          [setAlertMessage] = useContext(MessageContext)

	/**
	* Update the editor content
	*/
	const handleAction = async (action:string):Promise<void> => {
		// if (contentLength === 0) return;
		const newState = await clipboardAction(action, editorRef)
		if (newState instanceof EditorState)
			setEditorState(newState)
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