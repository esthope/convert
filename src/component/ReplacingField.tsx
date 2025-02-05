import {ReactElement, useState, useContext} from "react";
import TestButton from 'component/TestButton';

import {getRaws, getSelection, createContent} from 'util/editorHandler';
import {transformTexts} from 'util/textHandler';
import {EditorContext} from 'service/context';

const ReplacingField = (): ReactElement => {
	const [choice, setChoice] = useState<string>('');

  	const [editorState, setEditorState] = useContext(EditorContext);

	/**
	 * Replace the text from selected string
	 * 1. get the selection from blocks
	 * 2. split the block text
	 * 3. update states
	 */
	const replaceSelection = ():void => {
		const currentRaws = getRaws(editorState),
			{blocks} = currentRaws,
			selections = getSelection(blocks, editorState);

		if (selections.length === 0) return;

		transformTexts(selections, blocks, choice)
		setEditorState(createContent(currentRaws))
	}

	return (
		<div id="replace-container" className="flex">
        	<input
			type="text" 
			value={choice}
			className="green-background quicksand-font"
			placeholder="Saisir le caratère"
			onChange={({target})=>{setChoice(target.value)}} />

			<TestButton onClick={replaceSelection} />
      </div>
	)
}

export default ReplacingField;