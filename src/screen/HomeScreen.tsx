// main
import {useEffect, useState} from "react";
import {EditorState} from "draft-js";
// util
import {EditorContext, MessageContext} from 'service/context';
import {getContentLength} from 'util/textHandler';
import {initSelection} from 'util/editorHandler';
import {initialMessage} from "util/errorHandler";
import {Message} from 'constant/interfaces';
// element
import CaseContainer from 'component/CaseContainer';
import ReplaceField from 'component/ReplaceField';
import TextEditor from 'component/TextEditor';
import ActionContainer from 'component/ActionContainer';
import AlertMessage from 'component/AlertMessage';

import CustomButton from 'component/CustomButton';

const Home = () => {

  const 
        [hasMounted, setHasMounted] = useState<boolean>(false),
        [contentLength, setContentLength] = useState<number>(0),
        [alertMessage, setAlertMessage] = useState<Message>(initialMessage),
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
        ;

  useEffect(()=>{
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    // update the content length
    const currentContent = editorState.getCurrentContent();
    setContentLength(getContentLength(currentContent));

    // [!] prevent selection bugs
    // initSelection(editorState);

  // eslint-disable-next-line
  }, [editorState])

  return (
    <EditorContext.Provider value={[editorState, setEditorState]}>
      <MessageContext.Provider value={[alertMessage, setAlertMessage]}>
      <main>
          <CaseContainer contentLength={contentLength} />
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