import {useEffect, useState} from "react";
import {EditorState, convertFromRaw} from "draft-js";
import SquareContainer from 'component/SquareContainer';
import ReplacingField from 'component/ReplacingField';
import CustomEditor from 'component/CustomEditor';

const Home = () => {

  const [hasMounted, setHasMounted] = useState<boolean>(false),
        [raws, setRaws] = useState<any>(),
        [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  /*
  content.getBlockForKey(selection.getStartKey()) // block before
  content.getBlockBefore(startKey)
  currentBlock.getPrevSiblingKey()
  RichUtils.handleKeyCommand(editorState, command)
  keyBindingFn={(event:any):any => {}} // pas de maj du editorState en direct ; keyup pas écouté
  handleBeforeInput={(chars, editorState):any => {seulement à la modif du texte}}

  CONTROLE
    selection.hasEdgeWithin('ea2b7', 0, 2);
    editorState.getCurrentContent().hasText()
    currentStyle.isEmpty()

  SELECTION
    editorState.getCurrentInlineStyle()

  CONTENT
    parentRef.current.innerText
    editor.current.props.editorState
    contentState.getFirstBlock() si innerText contains \n
    contentState.getPlainText()
    editorState.getDecorator()
    toggleInlineStyle
  */

  useEffect(()=>{
    if (!hasMounted) {
      setHasMounted(true);
      return
    }

    const contentRaws = convertFromRaw(raws);
    setEditorState(EditorState.createWithContent(contentRaws));
  // eslint-disable-next-line
  }, [raws])

  return (
    <main>
      <SquareContainer changeRaws={setRaws} editorState={editorState} />
      <ReplacingField changeRaws={setRaws} editorState={editorState} />
      <CustomEditor editorState={editorState} setEditorState={setEditorState}/>
    </main>
  )
}

export default Home;