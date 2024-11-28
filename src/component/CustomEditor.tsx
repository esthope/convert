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

  /**
   * Listen the delete command of DraftJS to cancel it 
   * It uses the shortcut ctrl•D and ctrl•maj•D. We need those for the selection handler
   * @param  {string}       command     The command name 
   * @param  {EditorState}  editorState The current state of the editor content
   */
  const onCancelDelete = (command:string, editorState:EditorState):any => {
    console.log(command)
    if (command === 'delete') {
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
      if (selectMode && (type === 'mouseup' || code.includes('Shift')))
      {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
        console.log(editorState.getSelection().toJS())
        debugger
        // faire nouvel algo qui prend en compte multilgne
        // entrer manuellement la selection avec prise en compte de la selection entre ligne
        // déplacer les fonctions dans utils ou organiser ou renommer

      }
    }
    catch(err)
    {
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

    // handle multi selection
    let event:any;
    event = window.event;
    let instance = event.constructor.name;
    if (instance === 'MouseEvent') handleSelection(event, editorState);
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
      onKeyUp={(event:any):void => {handleSelection(event, editorState)}}
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
keyBindingFn={(event:any):any => {}} // pas de maj du editorState en direct ; keyup pas écouté
handleBeforeInput={(chars, editorState):any => {seulement à la modif du texte}}
*/