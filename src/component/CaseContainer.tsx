// main
import {ReactElement, useContext} from "react";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getRaws, initContent, getSelection, createContent} from 'util/editorHandler';
import {transformTexts, changeCase} from 'util/textHandler';
// element
import {Block} from 'constant/interfaces';
import {Case} from 'constant/interactionKey';
import CaseButton from './CaseButton';
import InverseLabel from './InverseLabel';
// alert 
import {Message} from 'constant/interfaces';
import {create_error} from 'util/errorHandler';
let errorMsg:Message;

const caseProps = [
	{ content: 'AB', action: Case.upper },
	{ content: 'ab', action: Case.lower },
	{ content: 'abCd', action: Case.camel },
	{ content: 'Ab Cd', action: Case.capital },
	{ content: InverseLabel, action: Case.inversion }
]

const CaseContainer = (): ReactElement => {
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
			<CaseButton content="init" onClick={()=>initContent(setEditorState)} />
			{
				caseProps.map((property, index)=>
					<CaseButton
						key={index}
						content={property.content}
						onClick={() => updateText(property.action)} />
				)
			}
		</section>
	)
}

export default CaseContainer;