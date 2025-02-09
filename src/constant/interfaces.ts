import {RawDraftContentBlock, RawDraftContentState} from "draft-js";

export type Block = RawDraftContentBlock; //
export type Raw = RawDraftContentState;

export type Selection = {
	block_key?: string, // ?:
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

export interface StringIndex {
    [index: string]: any
}

export interface Interaction {
	data_id:string,
	entry:string,
	unactive?:boolean,
	label?:string,
	shift?:boolean,
	key?:string
}

export interface Message {
	type?:string,
	message?:string,
	displayed:boolean|null,
}