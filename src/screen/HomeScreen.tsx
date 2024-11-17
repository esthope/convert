import SquareContainer from 'component/SquareContainer';
import CustomComponent from 'component/CustomComponent';
import {Cursor} from 'constant/interfaces';
import circle from 'assets/circle.svg' ;
import {getCurrentRaws} from 'util/editorHandler';

import {useEffect, useRef, useState} from "react";
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from "draft-js";

const Home = ():ReactElement => {

  let begining = 0,
      ending = -1;

  const parentRef = useRef(null);

  const [choice, setChoice] = useState<string>(''),
        [selected, setSelected] = useState<string>(''),
        [changed, setChanged] = useState<boolean>(false),
        [hasMounted, setHasMounted] = useState<boolean>(false),
        [raws, setRaws] = useState({}),
        [editorState, setEditorState] = useState(EditorState.createEmpty()),
        [cursor, setCursor] = useState<Cursor>({anchor: begining, extent: ending });

  /**
   * Get all the selection of the text from each Block
   * @return {array} selection
   */
  const getSelection = ():Array => {
    let selections = [];
    blocks.forEach((block, index):void => {
      const {key, inlineStyleRanges} = block;
      if (inlineStyleRanges.length <= 0) return;

      // add the block key to the first selection
      inlineStyleRanges[0].block_key = key;
      selections.push(...inlineStyleRanges)

      // empty the selection
      block.inlineStyleRanges = [];
    })

    return selections;
  }

  const franckRemplacer = ():void => {
    try
      {
      /*
      CONTROLE
        selection.hasEdgeWithin('ea2b7', 0, 2);
        editorState.getCurrentContent().hasText()
        currentStyle.isEmpty()

      SELECTION
        selection.getAnchorOffset()
        selection.getEndOffset()
        selection.getHasFocus()
        selection.getStartOffset()
        selection.isBackward()
        let {anchorOffset, extentOffset} = document.getSelection();

        editorState.getCurrentInlineStyle()
      */
     
        const selection = editorState.getSelection(),
              currentStyle = editorState.getCurrentInlineStyle(),
              currentRaws = getCurrentRaws(editorState),
              {blocks} = currentRaws;

        let currentBlock:Object; // [!] type Block

        

        // replace selection
        selections.forEach((selection, index):void => {
          const {offset, length, block_key} = selection;

          // get the current block with its passed key
          if (block_key) 
          {
            currentBlock = blocks.find((block)=>block.key === block_key)
          }

          // update the section
          let begining = currentBlock.text.slice(0,offset),
              ending = currentBlock.text.slice(offset + length);

          currentBlock.text = begining + choice + ending;
        });

        // update the text
        setRaws(currentRaws);
        setChanged(true);
      }
      catch(err)
      {
        console.log(err)
      }
  }

  useEffect(()=>{
    if (hasMounted) {

      if (changed) 
      {
        const contentRaws = convertFromRaw(raws);
        setEditorState(EditorState.createWithContent(contentRaws));
        setChanged(false);
      }

    } else {
      setHasMounted(true);
    }
  }, [raws])

  return (
    <main>
      <SquareContainer setChanged={setChanged} editorState={editorState} setRaws={setRaws} />

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
          onClick={franckRemplacer}
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

FRANCK
    let areaCopy = areaValue;
    const {anchor, extent} = cursor;

    begining = areaCopy.slice(0,anchor);
    ending = areaCopy.slice(extent);
    areaCopy = begining + choice + ending;
FRANCK END

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