import {useEffect, useState} from "react";
import {EditorState, convertFromRaw} from "draft-js";
import SquareContainer from 'component/SquareContainer';
import ReplacingField from 'component/ReplacingField';
import CustomEditor from 'component/CustomEditor';

import {EditorContext} from 'service/context';
import {initSelection, getRaws, getContentLength} from 'util/editorHandler';
import {Raw} from 'constant/interfaces';

const Home = () => {

  const [hasMounted, setHasMounted] = useState<boolean>(false),
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
    initSelection(editorState);

  }, [editorState])

  return (
    <EditorContext.Provider value={[editorState, setEditorState]}>
      <main>
          <SquareContainer />
          <ReplacingField />
          <CustomEditor contentLength={contentLength} />
      </main>
    </EditorContext.Provider>
  )
}

export default Home;