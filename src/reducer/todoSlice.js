import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  todo: [
    {
      id: 21345,
      title: "odio",
      content: "justo odio",
    },
    {
      id: 213,
      title: "odio",
      content: " justo odio",
    },
    {
      id: 45,
      title: "Cras",
      content: "Cras justo odioCras",
    },
  ],
};

const todoSlice = createSlice({
  name: "test",
  initialState: initialValues,
  reducers: {
    addTodo: (state, action) => {
      state.todo.push(action.payload);
      return state;
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter(
        (item) => parseInt(item.id) !== parseInt(action.payload)
      );
      return state;
    },
    editTodo: (state, action) => {
      state.todo = state.todo.map((todo) => {
        if (parseInt(todo.id) === parseInt(action.payload.id)) {
          return (todo = action.payload);
        } else {
          return todo;
        }
      });
      return state;
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
