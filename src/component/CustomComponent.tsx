import React, { createElement, useEffect, useRef, useState } from "react";

type Cursor = {
    anchor: number,
    extent: number
  }

const CustomComponent = ({areaValue, setAreaValue, setCursor, cursor}:{areaValue:string, setAreaValue:Function, setCursor:Function, cursor:Cursor}) => {

  let first = 'first ';
  let second = 'second';
  let third = ' third';
  let phrase = 'first second third';

  const [change, setChange] = useState(false),
        [children, setChildren] = useState([phrase]),
        [doubleclick, setDoubleClick] = useState(false);;

  const [hasMounted, setHasMounted] = useState(false);

  const ref = useRef(null);
  
  return (
    <div className="editor quicksand-font green-background"
      onClick={()=>ref.current.focus()}>

      {/*<div className="placeholder">
        <p className={areaValue !== '' ? 'none':''}>Inscrire le texte</p>
      </div>*/}

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
        }}
        onInput={({target})=>{
          setAreaValue(target.textContent)
          setChange(!change);
        }}
        // onBlur={()=>console.log('blur')}
        contentEditable
        suppressContentEditableWarning>
        {
          createElement(
            'p', {
              key: 'main',
              ref: ref
            }, 
            children
          )
        }
        </div>
    </div>
  )
}

export default CustomComponent;

/*

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