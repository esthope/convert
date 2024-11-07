import SquareButton from './SquareButton.tsx';
import inversionArrow from '../assets/inverse.svg';
import {Action} from '../constant/Cases.ts';

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

const SquareContainer = ({areaValue, setAreaValue}:{areaValue:string, setAreaValue:Function}):ReactElement => {

	const changeCase = (action:string):void => {
		let changedText:string,
				lowerRegex = new RegExp('\\p{Lower}', 'u'),
				caseRegex:Object;

		try
		{
			// verify text
			if (typeof areaValue !== 'string' || areaValue === '') return;

			// camel case and capitalize
			if (action === Action.camel || action === Action.capital) {
				changedText = areaValue.toLowerCase();
				caseRegex = (action === Action.camel) ? /\s\p{Letter}/gu : /(^|\s)\p{Letter}/gu;
			}

			// case inversion
			if (action === Action.inversion) {
				changedText = areaValue;
				caseRegex = /\p{Letter}/gu;
			}

			// change text
			changedText = changedText.replaceAll(caseRegex, (letter:string):string => (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase());
			// delete whitespaces for camel case
			if (action === Action.camel) changedText = changedText.replaceAll(/\s/g, '');
			setAreaValue(changedText);
		}
		catch (err)
		{
			// [!] handling error + send error
			console.log(err)
		}
	}

	return (
	<section className="square-container flex">
        <SquareButton content="init" onClick={()=>{setAreaValue('OUI non OUI OUI non non OUI àäâa èee éee ùuu oğuzhan özyakup')}} />

        <SquareButton content="AB" onClick={()=>{setAreaValue(areaValue.toUpperCase())}} />
  
        <SquareButton content="ab" onClick={()=>{setAreaValue(areaValue.toLowerCase())}} />
  
        <SquareButton content="abCd" onClick={()=>{changeCase(Action.camel)}} />

        <SquareButton content="Ab Cd" onClick={()=>{changeCase(Action.capital)}} />

        <SquareButton content={InversionText} onClick={()=>{changeCase(Action.inversion)}} />
      </section>
	)
}

export default SquareContainer;