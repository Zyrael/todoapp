import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { TodoList } from '@/types/todos';

interface TodosState {
  currentTodoListId: string;
  todoLists: TodoList[];
  showTodaysTodos: boolean;
}

const initialState: TodosState = {
  showTodaysTodos: false,
  currentTodoListId: '1',
  todoLists: [
    {
      id: '1',
      deletable: false,
      title: 'To do',
      todos: [],
    },
  ],
};

const todosSlice = createSlice({
  name: 'todosSlice',
  initialState,
  reducers: {
    setTodos(_, action: PayloadAction<TodosState>) {
      return action.payload;
    },
    addTodo(
      state,
      action: PayloadAction<{
        parentId?: string;
        text: string;
        deadline?: number;
      }>
    ) {
      const { parentId = '1', text, deadline = null } = action.payload;
      const currentTodoList = state.todoLists.find(
        (list) => list.id === parentId
      );
      if (currentTodoList) {
        currentTodoList.todos.push({
          id: uuidv4(),
          parentId,
          text,
          deadline,
          createdAt: Date.now(),
          completed: false,
        });
      }
    },
    toggleTodo(
      state,
      action: PayloadAction<{ parentId: string; todoId: string }>
    ) {
      const currentTodoList = state.todoLists.find(
        (list) => list.id === action.payload.parentId
      );
      if (currentTodoList) {
        const currentTodo = currentTodoList.todos.find(
          (todo) => todo.id === action.payload.todoId
        );
        if (currentTodo) {
          currentTodo.completed = !currentTodo.completed;
        }
      }
    },
    removeTodo(
      state,
      action: PayloadAction<{ parentId: string; todoId: string }>
    ) {
      const currentTodoList = state.todoLists.find(
        (list) => list.id === action.payload.parentId
      );
      if (currentTodoList) {
        currentTodoList.todos = currentTodoList.todos.filter(
          (todo) => todo.id !== action.payload.todoId
        );
      }
    },
    removeCompletedTodos(state, action: PayloadAction<{ listId: string }>) {
      const currentTodoList = state.todoLists.find(
        (todoList) => todoList.id === action.payload.listId
      );
      if (currentTodoList) {
        currentTodoList.todos = currentTodoList.todos.filter(
          (todo) => !todo.completed
        );
      }
    },
    removeAllTodosFromList(state, action: PayloadAction<{ listId: string }>) {
      const currentTodoList = state.todoLists.find(
        (todoList) => todoList.id === action.payload.listId
      );
      if (currentTodoList) {
        currentTodoList.todos = [];
      }
    },
    setCurrentTodoListId(state, action: PayloadAction<{ listId: string }>) {
      state.currentTodoListId = action.payload.listId;
    },
    addTodoList(state, action: PayloadAction<{ listTitle: string }>) {
      state.todoLists.push({
        id: uuidv4(),
        title: action.payload.listTitle,
        deletable: true,
        todos: [],
      });
    },
    removeTodoList(state, action: PayloadAction<{ listId: string }>) {
      state.todoLists = state.todoLists.filter(
        (todoList) => todoList.id !== action.payload.listId
      );
    },
    removeAllTodoLists() {
      return initialState;
    },
    setShowTodaysTodos(
      state,
      action: PayloadAction<{ showTodaysTodos: boolean }>
    ) {
      state.showTodaysTodos = action.payload.showTodaysTodos;
    },
  },
});

export const {
  setTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  removeCompletedTodos,
  removeAllTodosFromList,
  setCurrentTodoListId,
  addTodoList,
  removeTodoList,
  removeAllTodoLists,
  setShowTodaysTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
