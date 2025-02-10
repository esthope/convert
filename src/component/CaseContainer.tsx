// main
import {ReactElement, useContext} from "react";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getRaws, initContent, getSelection, createContent} from 'util/editorHandler';
import {transformTexts, changeCase} from 'util/textHandler';
import {fetchData} from 'util/dataHandler';
// element
import {Block} from 'constant/interfaces';
import {Case} from 'constant/interactionKey';
import TemplateButton from './TemplateButton';
import InverseLabel from './InverseLabel';
import CaseButton from './CaseButton';
// alert 
import {Message, Interaction} from 'constant/interfaces';
import {create_error} from 'util/errorHandler';
let errorMsg:Message;

const cases = fetchData('cases');

const CaseContainer = ({contentLength}:{contentLength:number}): ReactElement => {
  	const [editorState, setEditorState] = useContext(EditorContext),
          [setAlertMessage] = useContext(MessageContext)

	/**
	 * Choose the case treatment depending of the selected action
	 * Change case, then updtate states
	 * @param  {string} action 	constant from interactionKey
	 */
	const updateText = (action:string):void => {
		const currentRaws = getRaws(editorState),
			  {blocks} = currentRaws;

		const selections = getSelection(blocks, editorState)

		try
		{
			if (selections.length > 0) 
			{
		  		transformTexts(selections, blocks, undefined, action);
			}
			else
			{
			  	blocks.forEach((block:Block):void => {
			  		// verify text
					if (typeof block.text !== 'string' || block.text === '') return;

					// change text case
			  		block.text = changeCase(action, block.text)
			  	})

			}

			setEditorState(createContent(currentRaws))
	  	}
		catch (err)
		{
			// [ERR]
			errorMsg = create_error(`Le texte n'a pas pu être mis à jour : ${err}`)
			setAlertMessage(errorMsg)
		}
	}

	return (
		<section className="caseContainer flex">
			<TemplateButton label='init' length={contentLength} board_key='none' >
				<CaseButton
					content="init"
					onClick={()=>initContent(setEditorState)} />
			</TemplateButton>
			{
				cases.map((item:Interaction)=>
				<TemplateButton
				key={item.data_id}
				label={item.label}
				length={contentLength} board_key={item.key} >
					<CaseButton
					content={(item.data_id === Case.inversion) ? InverseLabel : item.title}
					onClick={() => updateText(item.data_id)} />
				</TemplateButton>
				)
			}
		</section>
	)
}

export default CaseContainer;