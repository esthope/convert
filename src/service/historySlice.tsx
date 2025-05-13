import {createSlice} from '@reduxjs/toolkit'

type ReduceAction = {
	payload:string
}

const historySlice = createSlice({
	name: 'history',
	initialState: [],
	reducers: {
		addContent: (state:any, action:ReduceAction):any => {
			if (state.length > 0) 
			{
				state[state.length-1].active = false;
			}

			state.push({
				content_id: state.length,
				content: action.payload,
				active: true
			})
		},
		activePrecedent: (state:any/*, action:any*/):any => {
			try
			{
				const current_index = state.findIndex((content:any)=>content.active)
				if (state.length === 0 || current_index <= 0) return

				state[current_index].active = false;
				state[current_index-1].active = true;

				const new_index = state.findIndex((content:any)=>content.active)
				console.log(new_index)

			}
			catch(err)
			{
				// [DEV]
				console.log(err)
			}
		}
	}
})

export const {addContent, activePrecedent} = historySlice.actions
export default historySlice.reducer