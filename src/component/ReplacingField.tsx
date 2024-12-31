import {EditorState, ContentState} from "draft-js";
import {useState} from "react";
import {Selection} from 'constant/interfaces';
import {getCurrentRaws} from 'util/editorHandler';
import TestButton from 'component/TestButton';
import circle from 'assets/circle.svg';

const ReplacingField = ({changeRaws, editorState}:{changeRaws:Function, editorState:EditorState}) => {
	const [choice, setChoice] = useState<string>('');

	/**
	* Get all the selections of each Block
	* @return {array} selection
	*/
	const getSelection = (blocks:any[]):any[] => {
		let selections:Selection[] = [];

		blocks.forEach((block, index):void => {
			const {key, inlineStyleRanges} = block;
			if (inlineStyleRanges.length <= 0) return;

			// add the block key to the first selection
			inlineStyleRanges[0].block_key = key;
			selections.push(...inlineStyleRanges)

			// empty the selection
			block.inlineStyleRanges = [];
		})

		debugger
		if (selections.length <= 0) 
		{
			const {anchorKey, anchorOffset, focusKey, focusOffset, isBackward} = editorState.getSelection().toJS();

			let currentSel = {
				block_key: (!isBackward) ? anchorKey : focusKey,
				offset: (!isBackward) ? anchorOffset : focusOffset,
				length: (!isBackward) ? (focusOffset - anchorOffset) : (anchorOffset - focusOffset)  
			}

			selections.push(currentSel)
		}

		return selections;
	}

	/**
	 * Split the selection, then concat with chosen text
	 * @param  {array} 	selections 	All positions of the selection
	 * @param  {array} 	blocks 		the text blocks from Draftjs
	 */
	const transformTexts = (selections:Selection[], blocks:any[]):void => {
		let selectionsLength = selections.length, 
			currentBlock:any,
			workText:string,
			newText = '',
			start = 0;

		selections.forEach((selection, index):void => {
			const {offset, length, block_key} = selection;

			if (block_key)
			{
				// add the rest of the sentence, then update
				if (newText !== '') 
				{
					newText += workText.slice(start);
					currentBlock.text = newText;
				}

				// get the current block with its passed key
				currentBlock = blocks.find((block)=>block.key === block_key);
				workText = currentBlock.text;

				// init
				newText = '';
				start = 0;
			}

			// get the section and add the choice
			newText += workText.slice(start, offset) + choice;
			// define the start position for next|last iteration
			start = offset + length;

			// on last iteration, add the rest of the sentence, then update
			if (selectionsLength === (index+1))
			{
				newText += workText.slice(start);
				currentBlock.text = newText;
			}
		})
	}

	/**
	 * Replace the text from selected string
	 * 1. get the selection from blocks
	 * 2. split the block text
	 * 3. update states
	 */
	const replaceSelection = ():void => {
		try
		{
			let mergedStart:any;
			let updatedBlockMap:any;
			let merged:any;

			// data test
			const 
				// currentRaws = getCurrentRaws(editorState)
			      	// ,{blocks} = currentRaws
			      	contentState = editorState.getCurrentContent()
				,blockMap = contentState.getBlockMap()
			      	,startBlock = contentState.getBlockForKey('ihct')
				,endBlock = contentState.getBlockForKey('dfr9n');

			// merge the texts
			const  mergedTexts = startBlock.getText() + endBlock.getText(),
				characterList = startBlock.getCharacterList().concat(endBlock.getCharacterList());

			mergedStart = startBlock.merge(
			{
			    text: mergedTexts,
			    characterList: characterList
			})

			// uupdate blocks
			updatedBlockMap = blockMap.set('ihct', mergedStart);
			updatedBlockMap = updatedBlockMap.remove('dfr9n');

			merged = contentState.merge({
			    blockMap: updatedBlockMap,
			    // selectionBefore: selectionState,
			    //selectionAfter: selectionState.merge({
			      // anchorKey: startKey,
			      // anchorOffset: mergedStart.getLength(),
			      // focusKey: startKey,
			      // focusOffset: mergedStart.getLength(),
			      // isBackward: false
			})

			// factoriser pour multiselection
			// à partir d'ici : hors boucle pour mettre à jour l'éditeur d'un coup

			// afterRemoval.set('selectionBefore', selection)
			// selection.isCollapsed() ? 'backspace-character' : 
			// tester directgement sur l'objet editorState de l'éditeur
			EditorState.push(editorState, merged, 'remove-range');

			// si ne met pas à jour : ?récupérer les block, maj raws. 
			// si action redondante : éditer manutellement les blocks + maj raws


			debugger
			// changeRaws(currentRaws);
		}
		catch(err)
		{
			console.log(err)
		}
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
