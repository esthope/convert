// main
import {ReactElement, useState, useEffect, useContext} from "react";
import {RichUtils, Editor, EditorState} from 'draft-js';
import "draft-js/dist/Draft.css";
// util
import {EditorContext, MessageContext} from 'service/context';
import {create_error} from 'util/errorHandler';
import {Message} from 'constant/interfaces';
// element
import CustomButton from 'component/CustomButton';
import style from "constant/base.scss";
const colors:any = style;
let errorMsg:Message;

const TextEditor = ({contentLength}:{contentLength:number}): ReactElement => {

  const [selectionClass, setSelectionClass] = useState<string>(''),
        [selectCount, setSelectCount] = useState<number>(0),
        [selectMode, setSelectMode] = useState<boolean>(false)

  const 
        [editorState, setEditorState] = useContext(EditorContext),
        [alertMessage, setAlertMessage] = useContext(MessageContext)

  /**
   * Listen the delete command of DraftJS to cancel it 
   * It uses the shortcut ctrl•D and ctrl•maj•D. We need those for the selection handler
   * @param  {string}       command     The command name 
   * @param  {EditorState}  editorState The current state of the editor content
   */
  const onPreventDelete = (command:string, editorState:EditorState):any => {
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

      // highlight selection 
      if (selectMode && (type === 'mouseup' || code.includes('Shift')))
      {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));

        // warn unavailability of multi-line selection
        const currentSel = editorState.getSelection().toJS();
        if (currentSel.anchorKey !== currentSel.focusKey) 
        {
          // [!] MSG
          // 'La sélection multi-lignes n\'est pas disponible.'
          errorMsg = create_error('--- nouveau')
          setAlertMessage(errorMsg)
        }
      }

      // count selection
      setSelectCount(window?.getSelection()?.toString()?.length ?? 0)
    }
    catch(err)
    {
      // [!] MSG
      errorMsg = create_error('SEL : ' + err)
      setAlertMessage(errorMsg)
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

  useEffect(()=>{
    let className = selectMode ? 'selectMode' : '';
    setSelectionClass(className);
  }, [selectMode])

  return (
    <section id="editor-container">

      <CustomButton onClick={()=>setSelectMode(!selectMode)} color={(selectMode) ? colors.ocher : undefined} />

      <div>
        <span>{contentLength} caractères</span>
        {(selectCount > 0) ?
          <>
            <span> – </span>
            <span>{selectCount} sélectionnés</span>
          </>
        : null}
      </div>

      <div
        className={`editor quicksand-font green-background ${selectionClass}`} 
        onKeyUp={(event:any):void => {handleSelection(event, editorState)}}
      >

        <Editor
        placeholder="Inscrire le texte"
        editorState={editorState}
        handleKeyCommand={onPreventDelete}
        customStyleMap={{ HIGHLIGHT: { backgroundColor: colors.ocher } }}
        onChange={onChange} />
      </div>
    </section>
  )
}

export default TextEditor;