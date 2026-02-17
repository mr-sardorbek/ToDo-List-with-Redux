import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    todoToggle: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    },
    editTodo:(state, action) => {
        const {id, newText} = action.payload

        state.todos = state.todos.map((todo) => todo.id === id ? {...todo, text: newText} : todo)
    }
  },
});

export const { addTodo, deleteTodo, todoToggle, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
