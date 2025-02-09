// main
import {ReactElement, useContext,useEffect} from "react";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getRaws, initContent, getSelection, createContent} from 'util/editorHandler';
import {transformTexts, changeCase} from 'util/textHandler';
import {fetchData} from 'util/dataHandler';
// element
import {Block} from 'constant/interfaces';
import {Case} from 'constant/interactionKey';
import CaseButton from './CaseButton';
import InverseLabel from './InverseLabel';
// alert 
import {Message, Interaction} from 'constant/interfaces';
import {create_error} from 'util/errorHandler';
let errorMsg:Message;

const cases = fetchData('cases');

const CaseContainer = ({contentLength}:{contentLength:number}): ReactElement => {
  	const [editorState, setEditorState] = useContext(EditorContext),
          [alertMessage, setAlertMessage] = useContext(MessageContext)

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
			<CaseButton entry='INIT' label='init' content="init" length={contentLength} onClick={()=>initContent(setEditorState)} />
			{
				cases.map((item:Interaction)=>
					<CaseButton
						key={item.data_id}
						entry={item.entry}
						label={item.label}
						content={(item.data_id === Case.inversion) ? InverseLabel : item.title}
						board_key={item.key}
						length={contentLength}
						onClick={() => updateText(item.data_id)} />
				)
			}
		</section>
	)
}

export default CaseContainer;