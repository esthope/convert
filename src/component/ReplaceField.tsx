// main
import {ReactElement, useState, useContext, memo} from "react";
// util
import {EditorContext} from 'service/context';
import {getRaws, getSelection, createContent} from 'util/editorHandler';
import {transformTexts} from 'util/textHandler';
// element
import CustomButton from 'component/CustomButton';

const ReplaceField = (): ReactElement => {
	const 	[choice, setChoice] = useState<string>(''),
			[editorState, setEditorState] = useContext(EditorContext);

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
		<div className="flex gap-1">
        	<input
			type="text" 
			value={choice}
			className="green-background quicksand-font"
			placeholder="Saisir le caratère"
			onChange={({target})=>{setChoice(target.value)}} />

			<CustomButton onClick={replaceSelection} />
      	</div>
	)
}

export default memo(ReplaceField);