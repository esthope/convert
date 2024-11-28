import {RichUtils, Editor, EditorState} from "draft-js";
import {useRef, useState, LegacyRef, useEffect} from "react";
import "draft-js/dist/Draft.css";
// import 'style/customEditor.scss';
import './style/customEditor.scss';
import TestButton from 'component/TestButton';
import style from "constant/style.scss";

const CustomEditor = ({parentRef, editorState, setEditorState}:{parentRef:LegacyRef<HTMLDivElement>, editorState:EditorState, setEditorState:Function}) => {

  const [selectionClass, setSelectionClass] = useState<string>(''),
        [selectMode, setSelectMode] = useState<boolean>(false);;

  const editor = useRef<any>(null),
        colors:any = style;

  const onCancelDelete = (command:string, editorState:EditorState):any => {
    console.log(command)
    if (command === 'delete') {
      return 'handled'
    }
  }

  const onShiftUp = (event:any):any => {
    if (selectMode && event.code.includes('Shift'))
    {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
    }
    else if (event.ctrlKey && event.code === 'KeyD')
    {
      setSelectMode(!selectMode)
    }
  }

  const onChange = (editorState:EditorState):any => {
    let event:any;

    setEditorState(editorState);
    event = window.event;

    let instance = event.constructor.name; 
    if (instance === 'Event') 
    {
      handleSelection(event, editorState);
    }
  }

  const handleSelection = (event:any, editorState:EditorState) =>
  {
    const {code, type, ctrlKey} = event;
    if (selectMode)
    {

      if (code.includes('Shift')
        || (event instanceof MouseEvent && type === 'mouseup'))
      {
        // selection with the keyboard
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
      }
    }
    else if (ctrlKey && code === 'KeyD')
    {
      setSelectMode(!selectMode)
    }
  }

  useEffect(()=>{
    let className = selectMode ? 'selectMode' : '';
    setSelectionClass(className);
  }, [selectMode])

  return (
    <div id="editor-container" onClick={():void => editor.current.focus()}>

      <TestButton onClick={()=>setSelectMode(!selectMode)} color={(selectMode) ? colors.ocher : undefined} />

      <div 
      ref={parentRef}
      className={`editor quicksand-font green-background ${selectionClass}`} 
      // onKeyUp={onShiftUp}
      >

        <Editor
        ref={editor}
        placeholder="Inscrire le texte"
        editorState={editorState}
        handleKeyCommand={onCancelDelete}
        customStyleMap={{ HIGHLIGHT: { backgroundColor: colors.ocher } }}
        onChange={onChange} />
      </div>
    </div>
  )
}

export default CustomEditor;

/*
RichUtils.handleKeyCommand(editorState, command)
keyBindingFn={(event:any):any => {pas de maj du editorState en direct}}
handleBeforeInput={(chars, editorState):any => {seulement à la modif du texte}}
*/