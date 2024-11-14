// import {useState, useRef} from 'react';
import SquareContainer from '../component/SquareContainer.tsx';
import CustomComponent from '../component/CustomComponent.tsx';
import circle from 'assets/circle.svg' ;

import React, { createElement, useEffect, useRef, useState } from "react";
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from "draft-js";

const Home = ():ReactElement => {

  type Cursor = {
    anchor: number,
    extent: number
  }

  let begining = 0,
      ending = -1;

  const parentRef = useRef(null);

  const [areaValue, setAreaValue] = useState<string>(''),
        [choice, setChoice] = useState<string>(''),
        [selected, setSelected] = useState<string>(''),
        [hasMounted, setHasMounted] = useState(false),
        [raws, setRaws] = useState({}),
        [editorState, setEditorState] = useState(EditorState.createEmpty()),
        [cursor, setCursor] = useState<Cursor>({anchor: begining, extent: ending });

 useEffect(()=>{
    if (hasMounted) {
      const contentRaws = convertFromRaw(raws);
      setEditorState(EditorState.createWithContent(contentRaws))
    } else {
      setHasMounted(true);
    }
  }, [raws])

  return (
    <main>
      <SquareContainer areaValue={areaValue} setAreaValue={setAreaValue} editorState={editorState} setRaws={setRaws} />

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
          // onClick={franckRemplacer}
          >

          <img src={circle} alt="logo" />
        </button>
      </div>

      <CustomComponent parentRef={parentRef} editorState={editorState} setEditorState={setEditorState}/>
    </main>
  )
};
export default Home;


/*

  let areaCopy = areaValue;

  const franckRemplacer = ():void => {
    const {anchor, extent} = cursor;

    begining = areaCopy.slice(0,anchor);
    ending = areaCopy.slice(extent);
    areaCopy = begining + choice + ending;

    setAreaValue(areaCopy);
  }

    https://www.w3schools.com/jsref/jsref_obj_string.asp
    trim
    search       Searches a string for a value, or regular expression, and returns the index (position) of the match
    slice        Extracts a part of a string and returns a new string
    split        Splits a string into an array of substrings

    valueOf
    padanchor padEnd
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

  setSelected(areaValue.substring(target.selectionanchor, target.selectionEnd))


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
    cursoranchor: 4,
    cursorextent: 8,
    text: /(item)/g
  },
  {
    cursoranchor: 15,
    cursorextent: 16,
    text: /(item)/g
  }]

  let areaCopy = areaValue;
  selected.forEach((position) => {

    const {cursoranchor, cursorEnd} = position;

    let begining = areaCopy.slice(0,cursoranchor),
        ending = areaCopy.slice(cursorEnd);

    areaCopy = begining + choice + ending;
  })
*/