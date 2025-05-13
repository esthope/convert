// main
import {ReactElement, useEffect, useState, useRef, useCallback, useMemo} from "react";
import {EditorState, Editor} from "draft-js";
import {ErrorBoundary} from "react-error-boundary";
// util
import * as CustomMsg from 'constant/Messages';
import {EditorContext, MessageContext} from 'service/context';
import {getContentLength, updateTextCase, clipboardAction} from 'util/textHandler';
import {initialMessage, get_boundary_error, create_error, create_cause, is_message} from "util/errorHandler";
import {handle_press, getInteractionsKeys} from 'util/dataHandler';
import {interactionsData, Case} from 'constant/Interactions';
import {Message} from 'constant/interfaces';
// element
import {CaseError, ActionError, FieldError, EditorError} from 'component/ErrorComponents';
import Header from 'component/Header';
import CaseContainer from 'component/CaseContainer';
import ReplaceField from 'component/ReplaceField';
import TextEditor from 'component/TextEditor';
import ActionContainer from 'component/ActionContainer';
import AlertMessage from 'component/AlertMessage';

const keys = getInteractionsKeys(interactionsData),
      cases = Object.values(Case);

const Home = ():ReactElement => {
  const [started, setStarted] = useState<boolean>(false),
        [contentLength, setContentLength] = useState<number>(0),
        [alertMessage, setAlertMessage] = useState<Message>(initialMessage),
        [boardStatut, setBoardStatut] = useState<string>('');
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const editorRef = useRef<Editor>(null),
        boardStatut2 = useRef<string>('')

  const editorValues = useMemo(()=>([editorState, setEditorState, editorRef]), [editorState]),
        messageValues = useMemo(()=>([setAlertMessage, alertMessage]), [alertMessage])

  const key_listener = useCallback(async (event:KeyboardEvent):Promise<void> => {
    if (event.key === 'Control' || !event.ctrlKey || !editorRef?.current) return;

    let newState:any = null;
    // ? editorHasFocus
    const hasFocus = editorRef.current.editor === document.activeElement,
          interID = handle_press(event, keys, interactionsData, hasFocus),
          askedInter = (typeof interID === 'string') ? interID : '',
          caseInteraction = cases.includes(askedInter);

    try
    {
      // getting the interaction ID failed
      if (is_message(interID))
        throw interID

      // the interaction is a Case
      if (caseInteraction)
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

      // [!] button color
      boardStatut2.current = `${entry} success-color-btn`
      setBoardStatut(`${entry} success-color-btn`)
    }
    catch(err:any)
    {
      const cause = create_cause('INTERACTION', 'S-HOME', err),
            errorMsg = (is_message(err)) ? err : create_error(CustomMsg.TEXT_UP, cause)

      // [!] button color
      setAlertMessage(errorMsg)
      boardStatut2.current = `${entry} ${err?.level ?? 'error'}-color-btn`
      setBoardStatut(`${entry} ${err?.level ?? 'error'}-color-btn`)
    }
  }, [editorState])

  const display_error = (error:Error):void => {
    const errorMsg = get_boundary_error(error);
    setAlertMessage(errorMsg);
  }

  useEffect(()=>{
    // update the content length
    const currentContent = editorState.getCurrentContent();
    let length = getContentLength(currentContent);
    setContentLength(length);

    // the edition has started
    if (length > 0 && !started) {
      setStarted(true)
    }

    document.addEventListener('keydown', key_listener)
    return () => document.removeEventListener('keydown', key_listener)

  }, [editorState, started, key_listener])

  return (
    <>
      <Header started={started} />
      <MessageContext.Provider value={messageValues}>
        <main className="flex column">
          <EditorContext.Provider value={editorValues}>

            <section id="case-section" className="gap-5 flex-between align-start self-center">
              {/*CASES*/}
              <ErrorBoundary FallbackComponent={CaseError} onError={display_error} >
                <CaseContainer started={started} />
              </ErrorBoundary>

              {/*REPLACE*/}
              <ErrorBoundary FallbackComponent={FieldError} onError={display_error} >
                <ReplaceField />
              </ErrorBoundary>
            </section>

            <section id="editor-container" className="flex column gap-05">
              {/*EDITOR*/}
              <ErrorBoundary FallbackComponent={EditorError} onError={display_error} >
                <TextEditor contentLength={contentLength} />
              </ErrorBoundary>

              {/*ACTIONS*/}
              <ErrorBoundary FallbackComponent={ActionError} onError={display_error} >
                {/*boardStatut2*/}
                <ActionContainer started={started} boardStatut />
              </ErrorBoundary>
            </section>

          </EditorContext.Provider>

          <AlertMessage />
        </main>
      </MessageContext.Provider>
    </>
  )
}

export default Home;