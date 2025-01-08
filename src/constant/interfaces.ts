import {RawDraftContentBlock, RawDraftContentState} from "draft-js";

export type Block = RawDraftContentBlock;
export type Raw = RawDraftContentState;

export type Selection = {
	block_key: string, // ?:
	ending_key?: string,
	offset: number
	length: number,
	style?: 'HIGHLIGHT',
}

export type EditorSelection = {
	anchorKey: string,
	anchorOffset: number,
	focusKey: string,
	focusOffset: number,
	hasFocus: boolean,
	isBackward: boolean
}