// main
import {ReactElement, useEffect, useState, useRef} from "react";
import {EditorState, Editor, convertToRaw} from "draft-js";
import {ErrorBoundary,} from "react-error-boundary";
// util
import * as CustomMsg from 'constant/Messages';
import {EditorContext, MessageContext} from 'service/context';
import {getContentLength, updateTextCase, clipboardAction} from 'util/textHandler';
import {initialMessage, get_boundary_error, create_error, is_message} from "util/errorHandler";
import {handle_press, getInteractionsKeys} from 'util/dataHandler';
import {interactionsData, Case} from 'constant/Interactions';
import {Message} from 'constant/interfaces';
// element
import {CaseError, ActionError, EditorError} from 'component/ErrorComponents';
import CaseContainer from 'component/CaseContainer';
import ReplaceField from 'component/ReplaceField';
import TextEditor from 'component/TextEditor';
import ActionContainer from 'component/ActionContainer';
import AlertMessage from 'component/AlertMessage';

import CustomButton from 'component/CustomButton';

const keys = getInteractionsKeys(interactionsData),
      cases = Object.values(Case);

let hasMounted = false;
const Home = ():ReactElement => {
  const 
        [contentLength, setContentLength] = useState<number>(0),
        [alertMessage, setAlertMessage] = useState<Message>(initialMessage),
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
        ;

  const editorRef = useRef<Editor>(null)

  const key_listener = async (event:KeyboardEvent):Promise<void> => {

    if (event.key === 'Control' || !event.ctrlKey || !editorRef?.current) return;

    let newState:any = null;
    // ? editorHasFocus
    const hasFocus = editorRef.current.editor === document.activeElement,
          interID = handle_press(event, keys, interactionsData, hasFocus),
          askedInter = (typeof interID === 'string') ? interID : '';

    try
    {
      // getting the interaction ID failed
      if (is_message(interID))
        throw interID

      // the interaction is a Case
      if (cases.includes(askedInter))
      {
        event.preventDefault();
        newState = updateTextCase(askedInter, editorState, setAlertMessage)
      }
      // the interaction is an Action
      else if (askedInter)
      {
        // no prevent default is needed for action
        newState = await clipboardAction(askedInter, editorRef)
      }

      // getting new state failed
      if (is_message(newState))
        throw newState

      if (newState instanceof EditorState)
        setEditorState(newState)
    }
    catch(err:any)
    {
      // ? [DEV]
      // console.log(err)
      let errorMsg = (is_message(err)) ? err : create_error(CustomMsg.TEXT_UP)
      setAlertMessage(errorMsg)
    }
  }

  useEffect(()=>{
    if (!hasMounted) {
    hasMounted = true
      return;
    }

    // update the content length
    const currentContent = editorState.getCurrentContent();
    setContentLength(getContentLength(currentContent));

    document.addEventListener('keydown', key_listener)
    return () => document.removeEventListener('keydown', key_listener)

  // eslint-disable-next-line
  }, [editorState]) // key_listener

  const display_error = (error:Error, info:any):void => {
    // [DEV]
    // console.log('home')
    const errorMsg = get_boundary_error(error);
    setAlertMessage(errorMsg);
  }

  return (
    <EditorContext.Provider value={[editorState, setEditorState, editorRef]}>
      <MessageContext.Provider value={[alertMessage, setAlertMessage]}>
      <main>

        <ErrorBoundary FallbackComponent={CaseError} onError={display_error} >
          <CaseContainer contentLength={contentLength} />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={EditorError} onError={display_error} >
          <ReplaceField />
          <TextEditor contentLength={contentLength} />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ActionError} onError={display_error} >
          <ActionContainer contentLength={contentLength} />
        </ErrorBoundary>

        {/*<CustomButton onClick={()=>setAlertMessage({level: 'error', message:'••• ancien', displayed: true})} />*/}
        <AlertMessage />

      </main>
      </MessageContext.Provider>
    </EditorContext.Provider>
  )
}

export default Home;