import {EditorState} from "draft-js";
import {useState, useEffect} from "react";
import {Selection} from 'constant/interfaces';
import {getCurrentRaws} from 'util/editorHandler';
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

		return selections;
	}

	/**
	 * Split the selection, then concat with chosen text
	 * @param  {array} 	selections 	All positions of the selection
	 * @param  {array} 	blocks 		the text blocks from Draftjs
	 */
	const transformTexts = (selections:Selection[], blocks:any[]):void => {
		let currentBlock:any,
			changedText:string;

			console.log(selections)
		selections.forEach((selection, index):void => {
			const {offset, length, block_key} = selection;

			// get the current block with its passed key
			if (block_key)
			{
				currentBlock = blocks.find((block)=>block.key === block_key)
			}

			// update the section
			let begining = currentBlock.text.slice(0,offset),
			  ending = currentBlock.text.slice(offset + length);


			currentBlock.text = begining + choice + ending;
			debugger
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
			const currentStyle = editorState.getCurrentInlineStyle(),
			      currentRaws = getCurrentRaws(editorState),
			      {blocks} = currentRaws;

			// replace selection
			const selections = getSelection(blocks);
			transformTexts(selections, blocks);

			// update the text
			changeRaws(currentRaws);
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
	          onChange={({target})=>{setChoice(target.value)}}
	           />

	        <button
	          type="button"
	          className="flex-center"
	          onClick={replaceSelection}
	           >

	          <img src={circle} alt="logo" />
	        </button>
      </div>
	)
}

export default ReplacingField;