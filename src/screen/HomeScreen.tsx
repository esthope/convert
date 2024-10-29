import {useState, useEffect} from 'react';
import {Action} from '../constant/Cases.ts';
import SquareButton from '../component/SquareButton.tsx';
import logo from '../../public/logo.svg';

const Home = (): ReactElement => {

  const [areaValue, setAreaValue] = useState<string>(),
        [action, setAction] = useState<string>(''),
        [selection, setSelection] = useState<string>('');

  /*
    https://www.w3schools.com/jsref/jsref_obj_string.asp
    trim
    toUpperCase
    toLowerCase
    search       Searches a string for a value, or regular expression, and returns the index (position) of the match
    slice        Extracts a part of a string and returns a new string
    split        Splits a string into an array of substrings
    replaceAll

    valueOf
    padStart padEnd
    letter >= 'A'

    REGEX : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions
    /. : sélectionner une lettre.s en particulier
    {n,m} : pour multiselction ?
    /^\w/i: première lettre
   */
    
    /*
      - remplacer tout
     */
    const franckMajuscule = (action:string):void => {
      setAreaValue(areaValue.toUpperCase())
    }

    /*
      - remplacer tout
     */
    const franckMinuscule = (action:string):void => {
      setAreaValue(areaValue.toLowerCase())
    }

    /*
      - lowercase partout
      - départager tous les mots /\s\w/g
      - ignorer le premier
      - capitaliser la 1er lettre des mots
      - joindre les mots sans espace
     */
    const franckCamelCase = (action:string):void => {
      // text-transform: capitalize
      let transformed = areaValue.toLowerCase();
      transformed = transformed.replaceAll(/\s\w/g, (value:string):string => value.toUpperCase())
      transformed = transformed.replaceAll(/\s/gi, '');
      setAreaValue(transformed);
    }

    /*
      - lowercase partout
      - départager tous les mots (^|\s)\w
      - capitaliser la 1er lettre des mots
      - joindre les mots avec espace
     */
    const franckCapitalize = (action:string):void => {
      let transformed = areaValue.toLowerCase();
      transformed = transformed.replaceAll(/\s\w/g, (value:string):string => value.toUpperCase())
      setAreaValue(transformed);
    }

    /**/
    const franckInversion = (action:string):void => {
      //[\p{upper}\p{lower}]
      let transformed = areaValue.toLowerCase(),
          lowerRegex = new RegExp('[a-z]', 'g'), //\p{Lower}
          upperRegex = new RegExp('[A-Z]', 'g'); //\p{Upper}

/*
test.replaceAll(/\w/g, (letter) => {
  if (upperRegex.test(letter)) {
      console.log(letter, upperRegex.test(letter), 'upp')
      return letter.toLowerCase();
  } else if (lowerRegex.test(letter)) { 
      console.log(letter, lowerRegex.test(letter), 'low')
      return letter.toUpperCase();
  } else {
      return letter;
  }
})
       */

      transformed = transformed.replaceAll(/\w/gm, (letter:string):string => {
        return (upperRegex.test(letter)) ? letter.toLowerCase() : letter.toUpperCase();
      });

      setAreaValue(transformed);
    }

    /*
      - récupérer les caractères sélectionnés
      - récupérer le caractère de remplacement
      - là où ils se trouvent, les remplacer
     */
    const franckRemplacer = (action:string):void => {
      let selectedCharRegex = '/X{1,}/gi'; // state
          newChar = 'O';

      transformed = areaValue.replaceAll(selectedCharRegex, newChar);
      setAreaValue(transformed);
    }


  // if (areaValue !== "" && areaValue !== undefined) {}
  // if (action === Action.lower) {}
  const changeCase = (action:string): void => {
    franckMajuscule(action);
  }

  return (
    <main>

      <SquareButton action={Action.lower} text="Test Case" onClick={()=>{changeCase(Action.lower)}} />

      <textarea
        name="story"
        rows="20"
        cols="100"
        value={areaValue}
        onChange={({target})=>{setAreaValue(target.value)}}
      />

      {/*<img src={logo} className="App-logo" alt="logo" />*/}
    </main>)
};
export default Home;