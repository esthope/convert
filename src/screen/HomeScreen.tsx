// main
import {useEffect, useState} from "react";
import {EditorState} from "draft-js";
// util
import {EditorContext} from 'service/context';
import {initSelection} from 'util/editorHandler';
import {getContentLength} from 'util/textHandler';
// element
import CaseContainer from 'component/CaseContainer';
import ActionContainer from 'component/ActionContainer';
import ReplaceField from 'component/ReplaceField';
import TextEditor from 'component/TextEditor';
import CustomButton from 'component/CustomButton';

const Home = () => {

  const 
        [hasMounted, setHasMounted] = useState<boolean>(false),
        [contentLength, setContentLength] = useState<number>(0),
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

    // prevent selection bugs
    // initSelection(editorState);

  // eslint-disable-next-line
  }, [editorState])

  return (
    <EditorContext.Provider value={[editorState, setEditorState]}>
      <main>
          <CaseContainer />
          <ReplaceField />
          <TextEditor contentLength={contentLength} />
          <ActionContainer contentLength={contentLength} />
      </main>
    </EditorContext.Provider>
  )
}

export default Home;