import {configureStore} from '@reduxjs/toolkit'
import historyReducer from 'service/historySlice'
import buttonReducer from 'service/buttonSlice'


const store = configureStore({
	reducer: {
		history: historyReducer,
		button: buttonReducer
	}
})

export default store