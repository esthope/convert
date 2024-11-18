import {convertToRaw, convertFromRaw, EditorState, ContentState, RawDraftContentBlock} from "draft-js";
import {getCurrentRaws, initContent} from 'util/editorHandler';
import {Block} from 'constant/interfaces';
import {Action} from 'constant/Cases';
import SquareButton from './SquareButton';
import inversionArrows from 'assets/inverse.svg';

  /*
    https://www.w3schools.com/jsref/jsref_obj_string.asp
    trim
    search       Searches a string for a value, or regular expression, and returns the index (position) of the match
    slice        Extracts a part of a string and returns a new string
    split        Splits a string into an array of substrings

    valueOf
    padStart padEnd
    letter >= 'A'

    REGEX : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions
    /. : sélectionner une lettre.s en particulier
    {n,m} : pour multiselction ?
    /^\w/i: première lettre
   */

const InversionText = () => {
    return (
      <div id="inversionText" className="flex-center">
        <span>A</span>
        <img src={inversionArrows} className="" alt="arrows" />
        <span>a</span>
      </div>
    )
}

const SquareContainer = ({changeRaws, editorState}:{changeRaws:Function, editorState:EditorState}) => {

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
				// [!] handling error + send error
				console.log(err);
			}

			changeRaws(currentRaws)
	}

	const actionProps = [
		{ content: 'AB', action: Action.upper },
		{ content: 'ab', action: Action.lower },
		{ content: 'abCd', action: Action.camel },
		{ content: 'Ab Cd', action: Action.capital },
		{ content: InversionText, action: Action.inversion }
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