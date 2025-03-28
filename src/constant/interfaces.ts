import {RawDraftContentBlock, RawDraftContentState} from "draft-js";

export type Block = RawDraftContentBlock; //
export type Raw = RawDraftContentState;

/*export type Selection2 = {
	anchor_key: string, // :

	focus_key: string,
	ending_set: number
	length: number,
	ending_len?: number,
	style?: 'HIGHLIGHT',
}*/

export type Selection = {
	anchor_key: string
	offset: number,
	length: number,
	focus?: number,
	ending_key?: string
	ending_set?: number,
	ending_len?: number,
	style?: 'HIGHLIGHT'
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
	title?:string,
	shift:boolean,
	focus:boolean|null,
	key:string
}

export interface Message {
	level:string,
	message?:string|null,
	displayed:boolean|null,
	reset?:boolean
}