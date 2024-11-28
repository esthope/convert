import {RawDraftContentBlock, RawDraftContentState} from "draft-js";

export type Block = RawDraftContentBlock;
export type Raw = RawDraftContentState;

export type Cursor = {
    anchor: number,
    extent: number
}

export type Selection = {
	offset: number
	length: number,
	style?: 'HIGHLIGHT',
	block_key?: string
}