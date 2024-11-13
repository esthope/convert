import { createElement, useEffect, useRef, useState } from "react";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, } from "draft-js";
import "draft-js/dist/Draft.css";

type Cursor = {
    anchor: number,
    extent: number
  }

const CustomComponent = ({areaValue, setAreaValue, setCursor, cursor}:{areaValue:string, setAreaValue:Function, setCursor:Function, cursor:Cursor}) => {

  let first = 'first ';
  let second = 'second';
  let third = ' third';

  const editor = useRef(null);
  const [change, setChange] = useState(false),
        [children, setChildren] = useState([]),
        [doubleclick, setDoubleClick] = useState(false),
        [hasMounted, setHasMounted] = useState(false),
        [editorState, setEditorState] = useState(EditorState.createWithText(areaValue));

  const selection = ()=> {
    setChildren([
      'oui test second',
      createElement('span', {key: 'fuck', className: 'highlight' }, ' event')
    ]);
  }


  const handleKeyCommand = (command) => {
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

  // useEffect(()=>{}, [])
  
  return (
    <div onClick={()=>editor.current.focus()}>
      <div onDoubleClick={(event)=>{
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
          onChange={(editorState) => {
            const contentState = editorState.getCurrentContent();
            setEditorState(editorState);
            // setAreaValue(contentState);
            // console.log(convertToRaw(contentState));
          }}
        />
      </div>
    </div>
  )
}

export default CustomComponent;

/*
  <div className="editor quicksand-font green-background"
    onClick={()=>ref.current.focus()}>

    <div className="placeholder">
      <p className={areaValue !== '' ? 'none':''}>Inscrire le texte</p>
    </div>

    <div
      ref={ref}
      className="content"
      onDoubleClick={()=>{
        let {anchorOffset, extentOffset} = document.getSelection();

        let currentCursor = {
          anchor: (anchorOffset < extentOffset) ? anchorOffset : extentOffset,
          extent: (extentOffset > anchorOffset) ? extentOffset : anchorOffset
        }

        setCursor(currentCursor);
        // selection();
      }}
      onSelect={(event)=>{
        // let {anchorNode, anchorOffset, extentNode, extentOffset} = document.getSelection();
        // console.log(anchorOffset, extentOffset)
      }}
      onInput={(event)=>{

        setChildren(createElement(
          'span', {className: 'highlight' }, event.target.textContent
        ))

        setAreaValue(event.target.textContent);
      }}
      contentEditable
      suppressContentEditableWarning>
      {
        createElement(
          'p', {
            key: 'main',
            ref: ref
          },
          children,
        )
      }
      </div>
  </div>

first,
createElement('span', {className: 'highlight'}, second), 
third

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

if (hasMounted) 
{
  textSelection();
}
else {
  console.log('nope');
  setHasMounted(true);      
}


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