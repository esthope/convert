// main
import {ReactElement, useContext, useEffect} from "react";
import {EditorState} from 'draft-js';
// util
import * as CustomMsg from 'constant/Messages';
import {EditorContext} from 'service/context';
import {clipboardAction} from 'util/textHandler';
import {Interaction} from 'constant/interfaces';
import {actionsData} from 'constant/Interactions';
// element
import ActionButton from 'component/ActionButton';
import TemplateButton from './TemplateButton';

let hasMounted = false;
const ActionContainer = ({contentLength}:{contentLength:number}): ReactElement => {

	const [editorState, setEditorState, editorRef] = useContext(EditorContext)

	/**
	* Update the editor content
	*/
	const handleAction = async (action:string):Promise<void> => {
		// if (contentLength === 0) return;
		const newState = await clipboardAction(action, editorRef)
		if (newState instanceof EditorState)
			setEditorState(newState)
	}

	useEffect(()=>{
		if (!hasMounted) {
			hasMounted = true
	    	return;
	    }

  		if (actionsData.length === 0) {
  			throw new Error(CustomMsg.ACTIONS, {cause: {fonite:'ACTION'}})
  		}

		return () => {}
	}, [actionsData])

	return (
		<section className="actionContainer flex">
  		{
			actionsData.map((item:Interaction):any => (
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