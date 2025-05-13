import {configureStore} from '@reduxjs/toolkit'
import historyReducer from 'service/historySlice'


const store = configureStore({
	reducer: {
		history: historyReducer
	}
})

export default store