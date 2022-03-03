import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "todoList",
  initialState: [
    {
      id: 1,
      name: "Learn Yoga",
      completed: false,
      priority: "Medium",
    },
    {
      id: 2,
      name: "Learn PHP",
      completed: true,
      priority: "High",
    },
    {
      id: 3,
      name: "Learn Laravel",
      completed: false,
      priority: "Low",
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },
    toggleTodoStatus: (state, action) => {
      // Dùng filter trả về 1 array [{}]
      // Dùng find trả về đúng 1 phần tử tương ứng {}
      const currentTodo = state.find(todo => todo.id === action.payload)
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed
      }
    }
  }
});
