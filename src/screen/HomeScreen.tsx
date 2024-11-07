import {useState} from 'react';
import SquareContainer from '../component/SquareContainer.tsx';
// import {franckRemplacer} from '../util/caseHandler.tsx';
import circle from 'assets/circle.svg' ;

const Home = ():ReactElement => {

  type Cursor = {
    start: number,
    end: number
  }

  const [areaValue, setAreaValue] = useState<string>(''),
        [choice, setChoice] = useState<string>(''),
        [selected, setSelected] = useState<string>(''),
        [cursor, setCursor] = useState<Cursor>({});

  // ref.current.focus

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

    oui non oui

*/


/*selection
  - boutton commencer sélection
  - depuis selection basique sur le texte
  - depuis ctrl D
  
  avoir là où il se trouvent

  "test oui test oui non"
  → selection du deuxième "test" seulement, comment le différencier ?

  récupérer les caractères sélectionnés
  récupérer le caractère de remplacement
  là où ils se trouvent, les remplacer
*/



/*
---------------
selection simple
---------------

setSelected(areaValue.substring(target.selectionStart, target.selectionEnd))


/(selected)/g

---------------
selection multiple totale identique
---------------

lecture evenement ctrl+D
/(selected)/g

test.matchAll(regex).forEach((match)=>{
  item.index
})

areaValue.replaceAll(regex, choice);

---------------
selection très mutiple (mots différents)
---------------

  selected = [
  {
    cursorStart: 4,
    cursorEnd: 8,
    text: /(item)/g
  },
  {
    cursorStart: 15,
    cursorEnd: 16,
    text: /(item)/g
  }]

  let areaCopy = areaValue;
  selected.forEach((position) => {

    const {cursorStart, cursorEnd} = position;

    let begining = areaCopy.slice(0,cursorStart),
        ending = areaCopy.slice(cursorEnd);

    areaCopy = begining + choice + ending;
  })
*/

  let areaCopy = areaValue,
      begining = 0,
      ending = -1;

  const franckRemplacer = ():void => {
    const {start, end} = cursor;

    begining = areaCopy.slice(0,start);
    ending = areaCopy.slice(end);
    areaCopy = begining + choice + ending;

    setAreaValue(areaCopy);
  }

  return (
    <main>
      <SquareContainer areaValue={areaValue} setAreaValue={setAreaValue} />

      <div id="replace-container" className="flex">
        <input
          type="text" 
          value={choice}
          className="green-background quicksand-font"
          placeholder="Saisir le caratère"
          onChange={({target})=>{setChoice(target.value)}} />

        <button
          type="button"
          className="flex-center"
          onClick={franckRemplacer}>

          <img src={circle} alt="logo" />
        </button>
      </div>

      <p
        contentEditable="true"
        className="editor quicksand-font green-background fit-content"
        // onBlur={({target})=>{setAreaValue(target.value)}}
        onInput={({target})=>{setAreaValue(target.value)}}
      >
        {areaValue}
      </p>

      <textarea
        name="story"
        rows="20"
        cols="100"
        value={areaValue}
        placeholder="Inscrire le texte"
        className="editor quicksand-font green-background"
        // className="green-background"
        onChange={({target})=>{setAreaValue(target.value)}}
        onSelect={({target})=>{
          setCursor({
            start: target.selectionStart,
            end: target.selectionEnd
          })
        // /> onSelectCapture={(item)=>{console.log(item)}}
        }} />
    </main>
  )
};
export default Home;