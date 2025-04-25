// main
import {ReactElement, useContext, useEffect} from "react";
import {EditorState} from "draft-js";
import {isMobile} from 'react-device-detect';
// util
import * as CustomMsg from 'constant/Messages';
import {MessageContext, EditorContext} from 'service/context';
import {is_message} from 'util/errorHandler';
import {initContent} from 'util/editorHandler';
import {updateTextCase} from 'util/textHandler';
import {Interaction} from 'constant/interfaces';
// element
import {Case, casesData} from 'constant/Interactions';
import TemplateButton from './TemplateButton';
import InverseLabel from './InverseLabel';
import CaseButton from './CaseButton';

const CaseContainer = ({started}:{started:boolean}): ReactElement => {

  	const [editorState, setEditorState] = useContext(EditorContext),
  		  // eslint-disable-next-line
  		  [setAlertMessage] = useContext(MessageContext)

    const handle_text = (action:string)=>{
    	const newState = updateTextCase(action, editorState, setAlertMessage);

    	if (is_message(newState))
	    {
	      	// returned error
	    	setAlertMessage(newState)
  			// [DEV]
  			throw new Error(newState.message, {cause: {fonite:'CASES'}})
	    }

		if (newState instanceof EditorState)
			setEditorState(newState)
    }

	useEffect(()=>{
  		if (casesData.length === 0) {
  			throw new Error(CustomMsg.CASES, {cause: {fonite:'CASES'}})
  		}
	}, [])

	return (
		<div className="caseContainer flex">
			{/*<TemplateButton label='init' started={started} shift={false} board_key='none' is_mobile={false}> <CaseButton content="init" onClick={()=>initContent(setEditorState)} /> </TemplateButton>*/}
			{
				/*Case.hasOwnProperty(item.entry)*/
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