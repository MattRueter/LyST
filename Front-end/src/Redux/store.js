import { configureStore } from '@reduxjs/toolkit';
import { fetchTodosSlice } from './reducers/fetchTodos_reducer';
import { addTodosSlice } from './reducers/addTodos_reducer';

const store = configureStore({
    reducer: {
        fetchTodosReducer : fetchTodosSlice.reducer,
        addTodosReducer : addTodosSlice.reducer,
    }
});

export default store;