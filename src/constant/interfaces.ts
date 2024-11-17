export type Cursor = {
    anchor: number,
    extent: number
}

export interface Block {

}


export interface Block {
	place_id: string,
	name: string,
	embedded_type: "administrative_region" | "stop_point"| "stop_area" | never,
	longitude?: string,
	latitude?: string,
}