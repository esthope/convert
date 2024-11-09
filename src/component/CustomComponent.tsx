import React, { createElement, useEffect, useRef, useState } from "react";

const CustomComponent = ({areaValue, setAreaValue, setCursor}:{areaValue:string, setAreaValue:Function, setCursor:Function}) => {

  const ref = useRef(null);
  const areaTexts = createElement(
    'p', {}, areaValue
  )

  useEffect(()=>{
    ref.current.textContent = areaValue;
  }, [areaValue])

  return (
    <>
    <div className="editor quicksand-font green-background"
      onClick={()=>ref.current.focus()}>

      <div className="placeholder">
        <p className={areaValue !== '' ? 'none':''}>Inscrire le texte</p>
      </div>

      <div
        ref={ref}
        className="content"
        onInput={({target})=>{
          setAreaValue(target.textContent)
        }}
        // onBlur={()=>console.log('blur')}
        contentEditable
        onSelect={()=>{
          const {anchorOffset, extentOffset} = document.getSelection();
          setCursor({
            anchor: (anchorOffset < extentOffset) ? anchorOffset : extentOffset,
            extent: (extentOffset > anchorOffset) ? extentOffset : anchorOffset
          })
        }}
        suppressContentEditableWarning></div>
    </div>

    {/*<textarea
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
      }} />*/}
    </>
  )
}

export default CustomComponent;