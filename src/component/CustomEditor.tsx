import {RichUtils, convertToRaw, convertFromRaw, Editor, EditorState} from "draft-js";
import {useRef, useState, LegacyRef} from "react";
import {Cursor} from 'constant/interfaces';
import SquareButton from './SquareButton';
import "draft-js/dist/Draft.css";

const CustomEditor = ({parentRef, editorState, setEditorState}:{parentRef:LegacyRef<HTMLDivElement>, editorState:EditorState, setEditorState:Function}) => {

  const editor = useRef<any>(null);

  const [change, setChange] = useState(false),
        [children, setChildren] = useState([]),
        [doubleclick, setDoubleClick] = useState(false),
        [hasMounted, setHasMounted] = useState(false);

  const handleKeyCommand = (command:any):any => {
    console.log(command)
    // const newState = RichUtils.handleKeyCommand(editorState, command);
  }

  return (
    <div onClick={():void => editor.current.focus()}>

      <div ref={parentRef} className="editor-container editor quicksand-font green-background" >

        <Editor
          ref={editor}
          editorState={editorState}
          placeholder="Inscrire le texte"
          handleKeyCommand={handleKeyCommand}
          customStyleMap={{ HIGHLIGHT: { backgroundColor: '#908859' } }}
          onChange={(editorState):void => {
            setEditorState(editorState)

            const event = window.event;
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