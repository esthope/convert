import {RichUtils, convertToRaw, convertFromRaw, Editor, EditorState} from "draft-js";
import {useRef, useState, LegacyRef} from "react";
import {Cursor} from 'constant/interfaces';
import SquareButton from './SquareButton';
import "draft-js/dist/Draft.css";
import style from "constant/style.scss";

const CustomEditor = ({parentRef, editorState, setEditorState}:{parentRef:LegacyRef<HTMLDivElement>, editorState:EditorState, setEditorState:Function}) => {

  const editor = useRef<any>(null);

  const [change, setChange] = useState(false),
        [children, setChildren] = useState([]),
        [doubleclick, setDoubleClick] = useState(false),
        [hasMounted, setHasMounted] = useState(false);

  const arrowsCode:number[] = [37, 39],
        colors:any = style;

  return (
    <div onClick={():void => editor.current.focus()}>

      <div ref={parentRef} className="editor-container editor quicksand-font green-background" >

        <Editor
          ref={editor}
          editorState={editorState}
          placeholder="Inscrire le texte"
          handleKeyCommand={(command:any):any => console.log(command)}
          customStyleMap={{ HIGHLIGHT: { backgroundColor: colors.ocher } }}
          onChange={(editorState):any => {
            setEditorState(editorState);

            const event = window.event;

            if (event instanceof Event && event.type === 'selectionchange') {
              setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
            }

            if (event instanceof MouseEvent && event.ctrlKey) {
              setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
            }
          }}
          />
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