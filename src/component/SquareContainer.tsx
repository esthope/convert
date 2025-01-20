import {ReactElement} from "react";
import {EditorState} from "draft-js";
import {getCurrentRaws, initContent, getSelection, transformTexts} from 'util/editorHandler';
import {changeCase} from 'util/caseHandler';
import {Block} from 'constant/interfaces';
import {Case} from 'constant/Cases';
import SquareButton from './SquareButton';
import SquareInverse from './SquareInverse';

const SquareContainer = ({changeRaws, editorState}:{changeRaws:Function, editorState:EditorState}): ReactElement => {


	/**
	 * Choose the case treatment depending of the selected action
	 * Change case, then updtate states
	 * @param  {string} action 	constant from Cases
	 */
	const updateText = (action:string):void => {
		const currentRaws = getCurrentRaws(editorState),
			  {blocks} = currentRaws;

		const selections = getSelection(blocks, editorState)

		try
		{
			if (action === 'UNDO')
			{
				console.log('undo')
				EditorState.undo(editorState);
				return
			}

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

			changeRaws(currentRaws)
	  	}
		catch (err)
		{
			// [!] MSG handling error + send error
			console.log(err);
		}

	}

	const actionProps = [
		{ content: 'Test', action: 'UNDO' },
		{ content: 'AB', action: Case.upper },
		{ content: 'ab', action: Case.lower },
		{ content: 'abCd', action: Case.camel },
		{ content: 'Ab Cd', action: Case.capital },
		{ content: SquareInverse, action: Case.inversion }
	]

	return (
		<section className="square-container flex">
			<SquareButton content="init" onClick={()=>initContent(changeRaws)} />
			{
				actionProps.map((property, index)=>
					<SquareButton
						key={index}
						content={property.content}
						onClick={() => updateText(property.action)} />
				)
			}
		</section>
	)
}

export default SquareContainer;