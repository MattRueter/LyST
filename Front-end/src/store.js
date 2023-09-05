import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './reducers/todoReducer';

const store = configureStore({
    reducer: {
        todoReducer: todoSlice.reducer,
    }
});

export default store;