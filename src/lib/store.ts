import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';

import todosSliceReducer from './features/todos/todosSlice';

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();

  localStorage.setItem('todos', JSON.stringify(state.todosSlice));
  return result;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      todosSlice: todosSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
