// main
import {ReactElement, useContext, useEffect} from "react";
import {useDispatch} from 'react-redux'
import {isMobile} from 'react-device-detect';
import {EditorState} from "draft-js";
// util
import {MessageContext, EditorContext} from 'service/context';
import {is_message, create_cause} from 'util/errorHandler';
import {addContentHistory} from 'util/historyHandler'
import {updateTextCase} from 'util/textHandler';
import {Interaction} from 'constant/interfaces';
import * as Msg from 'constant/Messages';
// element
import {Case, casesData} from 'constant/Interactions';
import TemplateButton from './TemplateButton';
import InverseLabel from './InverseLabel';
import CaseButton from './CaseButton';

const location = 'C-CASE';

const CaseContainer = ({started}:{started:boolean}): ReactElement => {

  	const [editorState, setEditorState, editorRef] = useContext(EditorContext),
  		  [setAlertMessage] = useContext(MessageContext),
  		  dispatch = useDispatch()

    const handle_text = (action:string)=>{
		let newText:string|undefined = undefined;
    	const newState = updateTextCase(action, editorState, setAlertMessage);

    	if (is_message(newState))
	    {
	      	// returned error
	    	setAlertMessage(newState)
	    }

		// set new content
		if (newState instanceof EditorState){
			setEditorState(newState)
			newText = newState.getCurrentContent().getPlainText()
		}

    	addContentHistory(dispatch, editorRef, newText)
    }

	useEffect(()=>{
  		if (casesData.length === 0) {
  			const cause = create_cause('CASE', location, Msg.EMPTY_DATA)
  			throw new Error(Msg.CASES, {cause: cause})
  		}
	}, [])

	return (
		<div className="caseContainer flex">
			{
				casesData.map((item:Interaction)=> (
				(true)
			  	? <TemplateButton
					key={item.data_id}
					label={item.label}
					started={started}
					shift={item.shift ?? false}
					board_key={item.key}
					is_mobile={isMobile} >
						<CaseButton
						content={(item.data_id === Case.inversion) ? InverseLabel : item.title}
						onClick={() => handle_text(item.data_id)} />
				</TemplateButton>
			  	: null
				))
			}
		</div>
	)
}

export default CaseContainer;