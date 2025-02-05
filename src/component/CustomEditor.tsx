import {ReactElement, useState, useEffect, useContext} from "react";
import {RichUtils, Editor, EditorState, convertToRaw} from 'draft-js';
import {getRaws} from 'util/editorHandler';

import {EditorContext} from 'service/context';
import TestButton from 'component/TestButton';
import style from "constant/style.scss";
import "draft-js/dist/Draft.css";

/* [!]
document
changer case de la sélection seulement
selectionne bleu → outfocus → remplace → corriger
*/

const CustomEditor = ({contentLength}:{contentLength:number}): ReactElement => {

  const [selectionClass, setSelectionClass] = useState<string>(''),
        [selectMode, setSelectMode] = useState<boolean>(false)

  const [editorState, setEditorState] = useContext(EditorContext);
  const colors:any = style;

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
    setEditorState(editorState)

    // handle multi selection
    let event:any;
    event = window.event;
    let instance = event?.constructor?.name;
    if (instance === 'MouseEvent') handleSelection(event, editorState);
  }

  /**
   * Clear the editor content
   */
  const clearContent = () => {
    const initialState = EditorState.createEmpty();
    setEditorState(initialState)
  }

  useEffect(()=>{
    if (contentLength === 0) return;

    let className = selectMode ? 'selectMode' : '';
    setSelectionClass(className);
  }, [selectMode])

  return (
    <div id="editor-container">

      <TestButton onClick={()=>setSelectMode(!selectMode)} color={(selectMode) ? colors.ocher : undefined} />

      <span>{contentLength} caractères</span>

      <div
      className={`editor quicksand-font green-background ${selectionClass}`} 
      onKeyUp={(event:any):void => {handleSelection(event, editorState)}}
      >

        <Editor
        placeholder="Inscrire le texte"
        editorState={editorState}
        handleKeyCommand={onCancelDelete}
        customStyleMap={{ HIGHLIGHT: { backgroundColor: colors.ocher } }}
        onChange={onChange} />
      </div>

      <TestButton onClick={()=>clearContent()} color={'#fff'} />
    </div>
  )
}

export default CustomEditor;