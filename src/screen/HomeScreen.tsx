// main
import {useEffect, useState, useRef} from "react";
import {EditorState, Editor} from "draft-js";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getContentLength, updateTextCase} from 'util/textHandler';
import {initSelection} from 'util/editorHandler';
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

  /*const handle_text = (action:string)=>{
    const newContent = updateTextCase(action, editorState);
    setEditorState(newContent)
  }*/

  const key_listener = (event:KeyboardEvent) => {
    if (!event.ctrlKey || !editorRef?.current) return;
    event.preventDefault();

    const hasFocus = editorRef.current.editor === document.activeElement;
    const askedInter = handle_press(event, keys, interactionsData, hasFocus);

    if (cases.includes(askedInter)) {
      const newContent = updateTextCase(askedInter, editorState);
      setEditorState(newContent)
    } else {

    }
  }

  useEffect(()=>{
      document.addEventListener('keydown', key_listener)
      return () => document.removeEventListener('keydown', key_listener)
  }, [])

  useEffect(()=>{
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    // update the content length
    // lenghtRef.current = getContentLength(currentContent)
    const currentContent = editorState.getCurrentContent();
    setContentLength(getContentLength(currentContent));

    // [!] prevent selection bugs
    // initSelection(editorState);

  // eslint-disable-next-line
  }, [editorState])

  return (
    <EditorContext.Provider value={[editorState, setEditorState, editorRef]}>
      <MessageContext.Provider value={[alertMessage, setAlertMessage]}>
      <main>
          <CaseContainer contentLength={(contentLength)} />
          <ReplaceField />
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