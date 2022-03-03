// Không cần tạo riêng các action ra nữa 
// Redux Toolkit cung cấp thư viện IMMER cho phép viết cú pháp mutation nhưng hoạt động immutation

// Là một khái niệm được quy định trong redux toolkit, các slide, reducer nhỏ, các mảnh cắt nhỏ trong rootReducer lớn
import { createSlice } from '@reduxjs/toolkit'

// Nhận vào object [name, initialState, reducers]
export default createSlice({
    name: 'filters',
    initialState: {
      search: "",
      status: "All",
      priorities: [],
    },
    reducers: {
      // Có bao nhiêu case thì tương ứng với field [là 1 function]
      // Trả về 1 giá trị state mới
      //TODO: Đặc điểm khác biệt là có thể viết mutation nhưng lại hoạt động immutation
      searchFilterChange: (state, action) => {
        state.search = action.payload
      }, // => Tạo ra 1 action creators => { type: 'filters/searchFilterChange'}
      statusFilterChange: (state, action) => {
        state.status = action.payload
      },
      prioritiesFilterChange: (state, action) => {
        state.priorities = action.payload
      }
    }
})