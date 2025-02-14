// main
import {useEffect, useState, useRef} from "react";
import {EditorState, Editor, SelectionState} from "draft-js";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getContentLength, updateTextCase, clipboardAction} from 'util/textHandler';
import {editorHasFocus} from 'util/editorHandler';
import {initialMessage} from "util/errorHandler";
import {handle_press, getInteractionsKeys} from 'util/dataHandler';
import {interactionsData, Case, Action} from 'constant/Interactions';
import {Message} from 'constant/interfaces';
// element
import CaseContainer from 'component/CaseContainer';
import ReplaceField from 'component/ReplaceField';
import TextEditor from 'component/TextEditor';
import ActionContainer from 'component/ActionContainer';
import AlertMessage from 'component/AlertMessage';

import CustomButton from 'component/CustomButton';

const keys = getInteractionsKeys(interactionsData),
      cases = Object.values(Case);

const Home = () => {
  const 
        [hasMounted, setHasMounted] = useState<boolean>(false),
        [contentLength, setContentLength] = useState<number>(0),
        [alertMessage, setAlertMessage] = useState<Message>(initialMessage),
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
        ;

  const editorRef = useRef<Editor>(null),
        lenghtRef = useRef(0)

  const key_listener = async (event:KeyboardEvent):Promise<void> => {

    if (!event.ctrlKey || !editorRef?.current) return;

    let newState:any = null;
    const hasFocus = editorRef.current.editor === document.activeElement,
          askedInter = handle_press(event, keys, interactionsData, hasFocus);

    if (cases.includes(askedInter))
    {
      event.preventDefault(); // no prevent default is needed for action
      newState = updateTextCase(askedInter, editorState);
    }
    else if (askedInter)
    {
      newState = await clipboardAction(askedInter, editorRef);
    }

    if (newState instanceof EditorState)
      setEditorState(newState)
  }

  useEffect(()=>{
      document.addEventListener('keydown', key_listener)
      return () => document.removeEventListener('keydown', key_listener)
  }, [editorState])

  useEffect(()=>{
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    // update the content length
    // lenghtRef.current = getContentLength(currentContent)
    const currentContent = editorState.getCurrentContent();
    setContentLength(getContentLength(currentContent));

  // eslint-disable-next-line
  }, [editorState])

  return (
    <EditorContext.Provider value={[editorState, setEditorState, editorRef]}>
      <MessageContext.Provider value={[alertMessage, setAlertMessage]}>
      <main>
          <CaseContainer contentLength={(contentLength)} />
          {/*<ReplaceField />*/}
          <TextEditor contentLength={contentLength} />
          <ActionContainer contentLength={contentLength} />
          <CustomButton onClick={()=>setAlertMessage({level: 'error', message:'••• ancien', displayed: true})} />
          <AlertMessage />
      </main>
      </MessageContext.Provider>
    </EditorContext.Provider>
  )
}

export default Home;