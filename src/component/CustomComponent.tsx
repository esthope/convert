import { createElement, useEffect, useRef, useState } from "react";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import SquareButton from './SquareButton.tsx';

type Cursor = {
    anchor: number,
    extent: number
  }

const CustomComponent = ({parentRef, editorState, setEditorState}:{parentRef:Object, editorState:string, setEditorState:Function}) => {

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

  const handleKeyCommand = (command) => {
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

  useEffect(()=>{
    if (hasMounted) {
      /*
      selection.getAnchorOffset()
      selection.getEndOffset()
      selection.getHasFocus()
      selection.getStartOffset()
      selection.isBackward()
      let {anchorOffset, extentOffset} = document.getSelection();

      currentStyle.isEmpty()
      editorState.getCurrentInlineStyle()
      */


      try
      {
        const contentState = editorState.getCurrentContent(),
              selection = editorState.getSelection(),
              currentStyle = editorState.getCurrentInlineStyle(),
              raws = convertToRaw(contentState),
              {blocks} = raws;

        let selections = [];
        blocks.forEach((block, index):void => {
          selections.push(...block.inlineStyleRanges)
        })
      }
      catch(err)
      {
        console.log(err)
      }

    } else {
      setHasMounted(true);
    }
  }, [editorState])

  return (
    <div onClick={()=>editor.current.focus()}>

      <SquareButton content="Test" onClick={(event) => applyStyle(event)} />

      <div ref={parentRef} onDoubleClick={(event)=>{
        let {anchorNode, anchorOffset, extentNode, extentOffset} = document.getSelection(),
            lastChar = 'terererererererererere'.charAt(extentOffset-1);
            
        if (lastChar === ' ') {
          extentOffset = extentOffset-1;
          document.getSelection().setBaseAndExtent(anchorNode, anchorOffset, extentNode, extentOffset);
        }
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
      }}
      className="editor-container editor quicksand-font green-background">

        <Editor
          ref={editor}
          editorState={editorState}
          placeholder="Inscrire le texte"
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          onEditorStateChange={(editorState) => {
            console.log('editor state changed')
          }}
          onChange={(editorState) => {
            const contentState = editorState.getCurrentContent();
            setEditorState(editorState);
            const toRaw = convertToRaw(contentState);
          }}
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