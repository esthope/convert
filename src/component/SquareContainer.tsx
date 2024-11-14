import SquareButton from './SquareButton.tsx';
import inversionArrow from '../assets/inverse.svg';
import {Action} from '../constant/Cases.ts';
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";

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

const InversionText = ():void => {
    return (
      <div id="inversionText" className="flex-center">
        <span>A</span>
        <img src={inversionArrow} className="" alt="arrows" />
        <span>a</span>
      </div>
    )
}

const SquareContainer = ({areaValue, setAreaValue, setRaws, editorState}:{areaValue:string, setAreaValue:Function, setRaws:Function, editorState:Object}):ReactElement => {

	const changeCase = (action:string, text:string):void => {
		let changedText:string,
				lowerRegex = new RegExp('\\p{Lower}', 'u'),
				caseRegex:Object;

			// verify text
			if (typeof text !== 'string' || text === '') return;

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
			changedText = changedText.replaceAll(caseRegex, (letter:string):string => (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase());
			// delete whitespaces for camel case
			if (action === Action.camel) changedText = changedText.replaceAll(/\s/g, '');
			return changedText;
	}

	const changeBlockCase = (action:string):void => {

	  	const contentState = editorState.getCurrentContent(),
	  				raws = convertToRaw(contentState),
						{blocks} = raws;

			try
			{
		  	blocks.forEach((block):Function => {
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
				console.log(err)
			}

		  setRaws(raws);
	}

	return (
	<section className="square-container flex">
        <SquareButton content="init" onClick={()=>{
        	const initialState = EditorState.createWithText('OUI non OUI OUI non non OUI àäâa èee éee ùuu oğuzhan özyakup');
        	const initialContent = initialState.getCurrentContent();
        	setRaws(convertToRaw(initialContent))
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