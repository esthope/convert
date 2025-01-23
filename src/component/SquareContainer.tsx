import {ReactElement, useContext} from "react";
import {EditorState} from "draft-js";
import {getCurrentRaws, initContent, getSelection} from 'util/editorHandler';
import {transformTexts, changeCase} from 'util/textHandler';
import {Block} from 'constant/interfaces';
import {Case} from 'constant/Cases';
import SquareButton from './SquareButton';
import SquareInverse from './SquareInverse';
import EditorContext from 'service/context';

const SquareContainer = ({changeRaws}:{changeRaws:Function}): ReactElement => {
  	const editorState = useContext(EditorContext);

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