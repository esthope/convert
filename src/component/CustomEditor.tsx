import {RichUtils, Editor, EditorState} from 'draft-js';
import {ReactElement, useRef, useState, useEffect} from "react";
import {getContentLength} from 'util/editorHandler';
import TestButton from 'component/TestButton';
import style from "constant/style.scss";
import "draft-js/dist/Draft.css";
// import './style/customEditor.scss';
import createUndoPlugin from "@draft-js-plugins/undo";

/* [!]
document
changer case de la sélection seulement
selectionne bleu → outfocus → remplace → corriger
*/

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const CustomEditor = ({editorState, setEditorState}:{editorState:EditorState, setEditorState:Function}): ReactElement => {

  const [selectionClass, setSelectionClass] = useState<string>(''),
        [selectMode, setSelectMode] = useState<boolean>(false),
        [contentLength, setContentLength] = useState<number>(0);;

  const editor = useRef<any>(null),
        colors:any = style;

  /**
   * Listen the delete command of DraftJS to cancel it 
   * It uses the shortcut ctrl•D and ctrl•maj•D. We need those for the selection handler
   * @param  {string}       command     The command name 
   * @param  {EditorState}  editorState The current state of the editor content
   */
  const onCancelDelete = (command:string, editorState:EditorState):any => {
    const event = window.event;

    console.log(command)

    if (command === 'delete' &&
        (event instanceof KeyboardEvent
        && event?.ctrlKey
        && event?.code === 'KeyD'
      )) {
      return 'handled'
    }
  }

  /**
   * Switch the multi selection mode
   * Save the current selection as highlight text into the editor state
   * @param  {any}          event       Current event : mouseup or keyup type event
   * @param  {EditorState}  editorState The current state of the editor content
   */
  const handleSelection = (event:any, editorState:EditorState) => {
    try
    {
      // get the needed properties
      const {code, type, ctrlKey} = event;

      // switch selection mode
      if (ctrlKey && code === 'KeyD') setSelectMode(!selectMode)

      // highlight the selection 
      if (selectMode && (type === 'mouseup' || code.includes('Shift'))) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));

        const currentSel = editorState.getSelection().toJS();
        if (currentSel.anchorKey !== currentSel.focusKey) 
        {
          // [!] MSG
          console.log('Sélection multiligne nest pas disponible');
        }
      }
    }
    catch(err)
    {
      // [!] MSG
      console.log('SEL : ', err)
    }
  }

  /**
   * Save the current state of the content
   * Handle the multi selection when mouseup is listened
   * @param  {EditorState}  editorState The current state of the editor content
   */
  const onChange = (editorState:EditorState):any => {
    // update text state
    setEditorState(editorState);

    // update the content length
    const currentContent = editorState.getCurrentContent();
    setContentLength(getContentLength(currentContent));

    // handle multi selection
    let event:any;
    event = window.event;
    let instance = event?.constructor?.name;
    if (instance === 'MouseEvent') handleSelection(event, editorState);
  }

  /**
   * For test, init the editor content
   * @param {Function} changeRaws : function to change the editor content
   */
  const resetContent = () => {
    const initialState = EditorState.createEmpty()
    setEditorState(initialState)
  }

  useEffect(()=>{
    let className = selectMode ? 'selectMode' : '';
    setSelectionClass(className);
  }, [selectMode])

  return (
    <div id="editor-container" onClick={():void => editor.current.focus()}>

      <TestButton onClick={()=>setSelectMode(!selectMode)} color={(selectMode) ? colors.ocher : undefined} />

      <span>{contentLength} charactères</span>

      <div
      className={`editor quicksand-font green-background ${selectionClass}`} 
      onKeyUp={(event:any):void => {handleSelection(event, editorState)}}
      >

        <Editor
        ref={editor}
        placeholder="Inscrire le texte"
        editorState={editorState}
        handleKeyCommand={onCancelDelete}
        customStyleMap={{ HIGHLIGHT: { backgroundColor: colors.ocher } }}
        // plugins={[undoPlugin]}
        onChange={onChange} />
      </div>

      <TestButton onClick={()=>resetContent()} color={'#fff'} />
      <UndoButton />
      <RedoButton />
    </div>
  )
}

export default CustomEditor;