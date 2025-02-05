import {ReactElement, useContext} from "react";

import {convertFromRaw} from "draft-js";
import {EditorContext} from 'service/context';
import {getRaws, initContent, getSelection, createContent} from 'util/editorHandler';
import {transformTexts, changeCase} from 'util/textHandler';

import {Block} from 'constant/interfaces';
import {Case} from 'constant/Cases';
import SquareButton from './SquareButton';
import SquareInverse from './SquareInverse';


const SquareContainer = (): ReactElement => {
  	const [editorState, setEditorState] = useContext(EditorContext);

	/**
	 * Choose the case treatment depending of the selected action
	 * Change case, then updtate states
	 * @param  {string} action 	constant from Cases
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
			<SquareButton content="init" onClick={()=>initContent(setEditorState)} />
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