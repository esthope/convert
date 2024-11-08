import { RichUtils } from "draft-js";

const Toolbar = ({ editorState, setEditorState }) => {

  const applyStyle = (event, style, method) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="toolbar-grid">
        <button
          title={'HIGHLIGHT'}
          onClick={(event) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
    // applyStyle(event, 'HIGHLIGHT', 'inline')
  	}}
          onMouseDown={(event) => event.preventDefault()}
        >HIGHLIGHT</button>
    </div>
  );
};

export default Toolbar;