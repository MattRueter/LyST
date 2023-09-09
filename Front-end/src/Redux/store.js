import { configureStore } from '@reduxjs/toolkit';
import { fetchTodosSlice } from './reducers/fetchTodos_reducer';
import { addTodosSlice } from './reducers/addTodos_reducer';
import { themeSlice } from './reducers/themeReducer';

const store = configureStore({
    reducer: {
        fetchTodosReducer : fetchTodosSlice.reducer,
        addTodosReducer : addTodosSlice.reducer,
        themeReducer: themeSlice.reducer,
    }
});

export default store;