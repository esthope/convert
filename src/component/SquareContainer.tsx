import {ReactElement} from "react";
import {EditorState} from "draft-js";
import {getCurrentRaws, initContent} from 'util/editorHandler';
import {Block} from 'constant/interfaces';
import {Action} from 'constant/Cases';
import SquareButton from './SquareButton';
import SquareInverse from './SquareInverse';

const SquareContainer = ({changeRaws, editorState}:{changeRaws:Function, editorState:EditorState}): ReactElement => {

	/**
	 * Change the case with more option
	 * @param  {string} action 			constant from Cases
	 * @param  {string} text 				text to change
	 * @return {string} changedText changed text
	 */
	const changeComplexCase = (action:string, text:string):string => {
		let changedText:string = '',
				caseRegex:RegExp = /./,
				lowerRegex = new RegExp('\\p{Lower}', 'u');

			// camel case and capitalize
			if (action === Action.camel || action === Action.capital) {
				changedText = text.toLowerCase();
				caseRegex = (action === Action.camel) ? /\s\p{Letter}/gu : /(^|\s)\p{Letter}/gu;
			}

			// case inversion
			if (action === Action.inversion) {
				changedText = text;
				caseRegex = /\p{Letter}/gu;
			}

			// change text
			if (changedText) 
			{
				changedText = changedText.replaceAll(caseRegex, (letter:string):string => (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase());
				// delete whitespaces for camel case
				if (action === Action.camel) changedText = changedText.replaceAll(/\s/g, '');
			}
			return changedText;
	}

	/**
	 * Choose the case treatment depending of the selected action
	 * Change case, then updtate states
	 * @param  {string} action 	constant from Cases
	 */
	const changeBlockCase = (action:string):void => {

			const currentRaws = getCurrentRaws(editorState),
						{blocks} = currentRaws;

			try
			{
		  	blocks.forEach((block:Block):void => {
		  		// verify text
					if (typeof block.text !== 'string' || block.text === '') return;

					// change text
		  		switch (action) {
						case Action.upper:
							block.text = block.text.toUpperCase();
							break;
						case Action.lower:
							block.text = block.text.toLowerCase();
							break;
						default:
		  			block.text = changeComplexCase(action, block.text)
					}
		  	})
		  }
			catch (err)
			{
				// [!] MSG handling error + send error
				console.log(err);
			}

			changeRaws(currentRaws)
	}

	const actionProps = [
		{ content: 'AB', action: Action.upper },
		{ content: 'ab', action: Action.lower },
		{ content: 'abCd', action: Action.camel },
		{ content: 'Ab Cd', action: Action.capital },
		{ content: SquareInverse, action: Action.inversion }
	]

	return (
		<section className="square-container flex">
			<SquareButton content="init" onClick={()=>initContent(changeRaws)} />
			{
				actionProps.map((property, index)=>
					<SquareButton
						key={index}
						content={property.content}
						onClick={() => changeBlockCase(property.action)} />
				)
			}
		</section>
	)
}

export default SquareContainer;