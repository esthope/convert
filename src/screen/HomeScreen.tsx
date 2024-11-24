import {useEffect, useRef, useState} from "react";
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from "draft-js";
import {Cursor, Raw, Block} from 'constant/interfaces';
import SquareContainer from 'component/SquareContainer';
import ReplacingField from 'component/ReplacingField';
import CustomEditor from 'component/CustomEditor';

const Home = () => {

  let begining = 0,
      ending = -1;

  const parentRef = useRef(null);

  const [changed, setChanged] = useState<boolean>(false),
        [hasMounted, setHasMounted] = useState<boolean>(false),
        [raws, setRaws] = useState<any>(),
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty()),
        [cursor, setCursor] = useState<Cursor>({anchor: begining, extent: ending });

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
    selection.getIsBackward()
    let {anchorOffset, extentOffset} = document.getSelection();

    editorState.getCurrentInlineStyle()
    editorState.getSelection()

  EDITOR CONTENT
    parentRef.current.innerText
    editor.current.props.editorState
    contentState.getFirstBlock() si innerText contains \n
    contentState.getPlainText()
    editorState.getDecorator()
    toggleInlineStyle
  */

  const changeRaws = (currentRaws:Raw):void => {
    setRaws(currentRaws);
    setChanged(true);
  }

  useEffect(()=>{
    if (!hasMounted) {
      setHasMounted(true);
      return
    }

    if (changed) 
    {
      const contentRaws = convertFromRaw(raws);
      setEditorState(EditorState.createWithContent(contentRaws));
      setChanged(false);
    }
  }, [raws])

  return (
    <main>
      <SquareContainer changeRaws={changeRaws} editorState={editorState} />

      <ReplacingField changeRaws={changeRaws} editorState={editorState} />

      <CustomEditor parentRef={parentRef} editorState={editorState} setEditorState={setEditorState}/>
    </main>
  )
}

export default Home;

/*
  https://www.w3schools.com/jsref/jsref_obj_string.asp
  trim
  search       Searches a string for a value, or regular expression, and returns the index (position) of the match
  split        Splits a string into an array of substrings
  letter >= 'A'

  REGEX : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions
  /. : sélectionner une lettre.s en particulier
  /^\w/i: première lettre

  boutton commencer sélection
  depuis selection basique sur le texte
  depuis ctrl D
*/