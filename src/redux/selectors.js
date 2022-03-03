import { createSelector } from "@reduxjs/toolkit";

// Việc sử dụng createSelector giúp cải thiện về mặt performance 
// Nếu như 1 trong dữ liệu không có sự thay đổi thì function tính toán ra không được thực thi lại giúp ghi nhớ lại 
// useCallback, useMemo giúp ghi nhớ lại được các object nó chỉ bị tính toán lại khi có sự thay đổi của dependencies 

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

// createSelector: Xử lý các selectors phụ thuộc vào dữ liệu của nhau
/**
 * Nhận nhiều selector và 1 callback
 * - Tham số đầu tiên chính là dữ liệu mà thằng todoListSelector trả về
 * - Tham số thứ hai chính là dữ liệu mà thằng searchTextSelector trả về
 *
 * => Nhận làm tham số của callback
 */
export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priorities) => {
    return todoList.filter((todo) => {
      // Nếu priorities rỗng thì ke đến điều kiện searchText
      if (status === "All") {
        // Nếu priorities.length = 0 thì check searchText
        // Ngược lại priorities có 1 element ngoài searchText ra còn kiểm tra
        return priorities.length
          ? todo.name.includes(searchText) && priorities.includes(todo.priority)
          : todo.name.includes(searchText);
      }

      return (
        // Nếu priorities.length mà không lựa chọn độ ưu tiên nào thì trả về true => để nó ke 2 điều kiện trên 
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priorities.length ? priorities.includes(todo.priority) : true)
      );
    });
  }
);
