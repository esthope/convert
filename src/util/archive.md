# react
```ts
// usestate changed
[changed, setChanged] = useState<boolean>(false),
const changeRaws = (currentRaws:Raw):void => {
	setRaws(currentRaws);
	setChanged(true);
}
if (changed) {setChanged(false)} // useeffect home

```

# case
```ts
/*
	- lowercase partout
	- départager tous les mots /\s\w/g
	- ignorer le premier
	- capitaliser la 1er lettre des mots
	- joindre les mots sans espace
*/
export const franckCamelCase = ():void => {
	// text-transform: capitalize
	let transformed = areaValue.toLowerCase();
	transformed = transformed.replaceAll(/\s\p{Letter}/gu, (value:string):string => value.toUpperCase())
	transformed = transformed.replaceAll(/\s/g, '');
	setAreaValue(transformed);
}

/*
	- lowercase partout
	- départager tous les mots (^|\s)\w
	- capitaliser la 1er lettre des mots
	- joindre les mots avec espace
*/
export const franckCapitalize = ():void => {
	let transformed = areaValue.toLowerCase();
	transformed = transformed.replaceAll(/(^|\s)\p{Letter}/gu, (value:string):string => value.toUpperCase())
	setAreaValue(transformed);
}

/**/
export const franckInversion = ():void => {
	//[\p{upper}\p{lower}]
	let lowerRegex = new RegExp('\\p{Lower}', 'u');

	let transformed = areaValue.replaceAll(/\p{Letter}/gu, (letter:string):string => {
	return (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase();
	});
	setAreaValue(transformed);
}
```

# selection sur plusieurs lignes

>>>
faire nouvel algo qui prend en compte multilgne
entrer manuellement la selection avec prise en compte de la selection entre ligne
→ comment gérer la suppression de ces sélections
>>>

```ts
// identifier sélection sur plusieurs lignes
const currentSel = editorState.getSelection().toJS();
if (currentSel.anchorKey !== currentSel.focusKey) 
{
	const formatedSel = formatSelection(currentSel);
	const block = getBlock(formatedSel.block_key, editorState)
}

// remplacer/fusionner textes
try
{
	let mergedStart:any;
	let updatedBlockMap:any;
	let merged:any;

	// data test
	const 
		// currentRaws = getRaws(editorState)
	    // ,{blocks} = currentRaws
	     contentState = editorState.getCurrentContent()
		,blockMap = contentState.getBlockMap()
	    ,startBlock = contentState.getBlockForKey('4au45')
		,endBlock = contentState.getBlockForKey('1aqf8');

	// merge the texts
	const  	mergedTexts = startBlock.getText() + endBlock.getText(),
			characterList = startBlock.getCharacterList().concat(endBlock.getCharacterList());

	mergedStart = startBlock.merge(
	{
	    text: mergedTexts,
	    characterList: characterList
	})

	// update blocks
	updatedBlockMap = blockMap.set('4au45', mergedStart);
	updatedBlockMap = updatedBlockMap.remove('1aqf8');

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
	debugger
	EditorState.push(editorState, merged, 'remove-range');

	// si ne met pas à jour : ?récupérer les block, maj raws. 
	// si action redondante : éditer manutellement les blocks + maj raws

	// changeRaws(currentRaws);
}


```

# récupération nombre de caractères sans saut de ligne
``` tsx
export const getContentLength = (currentContent:ContentState):number => {
	let textLength = 0;

	const blocks = currentContent.getBlocksAsArray();
	blocks.forEach((block) => {
		textLength += block.getLength();
	})

	return textLength;
}

/**
 * get the number of highlighted text
 * @param {EditorState}	editorState : current editor state
 * @return {number} count
 */
export const getSelectionCount = (editorState:EditorState):number => {
	let blocks = getRaws(editorState).blocks;
    const selections = getSelection(blocks, editorState)
    return selections.reduce((acc, curr)=>curr.length + acc, 0)
}
```