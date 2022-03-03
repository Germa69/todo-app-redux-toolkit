import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from '../components/Filters/filtersSlice'
import todosSlice from '../components/TodoList/todosSlice'

// configureStore # createStore là nhận vào 1 object
// Không cần viết thêm combineReducers nữa

const store = configureStore({
	reducer: {
		filters: filtersSlice.reducer,
		todoList: todosSlice.reducer
	}
})

export default store
