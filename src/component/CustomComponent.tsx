import { createElement, useEffect, useRef, useState, LegacyRef } from "react";
import {Cursor} from 'constant/interfaces';
import {RichUtils, convertToRaw, convertFromRaw, Editor, EditorState} from "draft-js";
import "draft-js/dist/Draft.css";
import SquareButton from './SquareButton';

const CustomComponent = ({parentRef, editorState, setEditorState}:{parentRef:LegacyRef<HTMLDivElement>, editorState:EditorState, setEditorState:Function}) => {

  const editor = useRef(null);

  // parentRef.current.innerText
  // editor.current.props.editorState
  // contentState.getFirstBlock() si innerText contains \n
  // contentState.getPlainText()
  // editorState.getCurrentInlineStyle()
  // editorState.getDecorator()
  // editorState.getSelection()
  // toggleInlineStyle

  const [change, setChange] = useState(false),
        [children, setChildren] = useState([]),
        [doubleclick, setDoubleClick] = useState(false),
        [hasMounted, setHasMounted] = useState(false);

  const handleKeyCommand = (command:any):boolean => {
    console.log('commnd !')
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "#908859",
    }
  }

  const setFocus = () => {
    // if (editor && editor.current)
      // editor.current.focus();
  }

  return (
    <div onClick={()=>{setFocus()}}>

      <SquareButton action='TEST' content="Test" onClick={(event:any) => console.log(event)} />

      <div ref={parentRef} onDoubleClick={(event)=>{
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
      }}
      className="editor-container editor quicksand-font green-background">

        <Editor
          ref={editor}
          editorState={editorState}
          placeholder="Inscrire le texte"
          // handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          onChange={(editorState)=>setEditorState(editorState)}
        />
      </div>
    </div>
  )
}

export default CustomComponent;

/*
    <div className="placeholder">
      <p className={areaValue !== '' ? 'none':''}>Inscrire le texte</p>
    </div>

<textarea
      name="story"
      rows="20"
      cols="100"
      value={areaValue}
      placeholder="Inscrire le texte"
      className="editor quicksand-font green-background"
      onChange={({target})=>{setAreaValue(target.value)}}
      onSelect={({target})=>{
        setCursor({
          anchor: target.selectionanchor,
          extent: target.selectionEnd
        })
      // /> onSelectCapture={(item)=>{console.log(item)}}
    }} />

let {anchorNode, anchorOffset, extentNode, extentOffset} = document.getSelection(),
              lastChar = phrase.charAt(extentOffset-1);

if (lastChar === ' ') {
  extentOffset = extentOffset-1;
  document.getSelection().setBaseAndExtent(anchorNode, anchorOffset, extentNode, extentOffset);
}

const textSelection = ()=>{
  const {anchor, extent} = cursor;

  let begining = phrase.slice(0,anchor),
      selected = phrase.slice(anchor,extent),
      ending = phrase.slice(extent);

  debugger
  console.log(cursor);
  console.log({begining: begining, selected: selected, ending: ending})

  setChildren([
    begining,
    // (begining) ?? begining,
    createElement('span', {key: 'nique', className: 'highlight'}, selected),
    third
  ])
}
*/