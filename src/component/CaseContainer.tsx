// main
import {ReactElement, useContext, useEffect} from "react";
// util
import * as CustomMsg from 'constant/Messages';
import {EditorContext} from 'service/context';
import {initContent} from 'util/editorHandler';
import {updateTextCase} from 'util/textHandler';
// element
import {Case, casesData} from 'constant/Interactions';
import TemplateButton from './TemplateButton';
import InverseLabel from './InverseLabel';
import CaseButton from './CaseButton';
// alert 
import {Interaction} from 'constant/interfaces';

let hasMounted = false;
const CaseContainer = ({contentLength}:{contentLength:number}): ReactElement => {
  	const [editorState, setEditorState] = useContext(EditorContext)

    const handle_text = (action:string)=>{
    	const newContent = updateTextCase(action, editorState);
    	setEditorState(newContent)
    }

	useEffect(()=>{
		if (!hasMounted) {
			hasMounted = true
	    	return;
	    }

  		if (casesData.length === 0) {
  			throw new Error(CustomMsg.CASES, {cause: {fonite:'CASES'}})
  		}

		return () => {}
	}, [casesData])

	return (
		<section className="caseContainer flex">
			<TemplateButton label='init' length={contentLength} shift={false} board_key='none' >
				<CaseButton
					content="init"
					onClick={()=>initContent(setEditorState)} />
			</TemplateButton>
			{
				casesData.map((item:Interaction)=>
				<TemplateButton
					key={item.data_id}
					label={item.label}
					length={contentLength}
					shift={item.shift ?? false}
					board_key={item.key} >
						<CaseButton
						content={(item.data_id === Case.inversion) ? InverseLabel : item.title}
						onClick={() => handle_text(item.data_id)} />
				</TemplateButton>
				)
			}
		</section>
	)
}

export default CaseContainer;