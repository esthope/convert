import {RichUtils, Editor, EditorState} from "draft-js";
import {useRef, useState, LegacyRef} from "react";
import "draft-js/dist/Draft.css";
import style from "constant/style.scss";

const CustomEditor = ({parentRef, editorState, setEditorState}:{parentRef:LegacyRef<HTMLDivElement>, editorState:EditorState, setEditorState:Function}) => {

  const editor = useRef<any>(null),
        colors:any = style;

const [selectionClass, setSelectionClass] = useState<string>('');

  const onShiftUp = (event:any):any => {
    // event.ctrlKey && event.code === 'keyD'
    if (event.code.includes('Shift')) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
    }
  }

  const onCancelDelete = (command:string, editorState:EditorState):any => {
    if (command === 'delete') {
      return 'handled'
    }
  }

  const onChange = (editorState:EditorState):any => {
    setEditorState(editorState);
    const event = window.event;

    if (event instanceof MouseEvent && event.ctrlKey) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
    }
  }

  // {selectionClass}
  return (
    <div onClick={():void => editor.current.focus()}>

      <div 
        ref={parentRef}
        className="editor-container editor quicksand-font green-background" 
        onKeyUp={onShiftUp} >

        <Editor
          ref={editor}
          editorState={editorState}
          placeholder="Inscrire le texte"
          handleKeyCommand={onCancelDelete}
          keyBindingFn={(event:any):any => {
            console.log(event.type)
          }}
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