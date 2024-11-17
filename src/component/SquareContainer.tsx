import {convertToRaw, convertFromRaw, EditorState, RawDraftContentBlock} from "draft-js";
import {getCurrentRaws} from 'util/editorHandler';
import {Action} from 'constant/Cases';
import SquareButton from './SquareButton';
import {Block} from 'constant/interfaces';
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

const SquareContainer = ({setChanged, setRaws, editorState}:{setChanged:Function, setRaws:Function, editorState:EditorState}) => {

	/**
	 * Change the case of a text depenting of the chosen action
	 * @param  {string} action 			constant from Cases
	 * @param  {string} text 				text to change
	 * @return {string} changedText changed text
	 */
	const changeCase = (action:string, text:string):string => {
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
	 * Change all the text of the text fields (blocks)
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
		  			block.text = changeCase(action, block.text)
					}
		  	})
		  }
			catch (err)
			{
				// [!] handling error + send error
				console.log(err);
			}

		  setRaws(currentRaws);
		  setChanged(true);
	}

	return (
	<section className="square-container flex">
        <SquareButton content="init" onClick={()=>{
        	// @ts-expect-error
        	const initialState = EditorState.createWithContent('OUI non OUI OUI non non OUI àäâa èee éee ùuu oğuzhan özyakup'); 
        	const initialContent = initialState.getCurrentContent();
        	setRaws(convertToRaw(initialContent));
        	setChanged(true);
        }} />

        <SquareButton content="AB" onClick={()=>{changeBlockCase(Action.upper)}} />
  
        <SquareButton content="ab" onClick={()=>{changeBlockCase(Action.lower)}} />
  
        <SquareButton content="abCd" onClick={()=>{changeBlockCase(Action.camel)}} />

        <SquareButton content="Ab Cd" onClick={()=>{changeBlockCase(Action.capital)}} />

        <SquareButton content={InversionText} onClick={()=>{changeBlockCase(Action.inversion)}} />
      </section>
	)
}

export default SquareContainer;