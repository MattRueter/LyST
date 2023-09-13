import { configureStore } from '@reduxjs/toolkit';
import { fetchTodosSlice } from './reducers/fetchTodos_reducer';
import { addTodosSlice } from './reducers/addTodos_reducer';
import { themeSlice } from './reducers/themeReducer';
import { userSlice } from './reducers/user_reducer';

const store = configureStore({
    reducer: {
        fetchTodosReducer : fetchTodosSlice.reducer,
        addTodosReducer : addTodosSlice.reducer,
        themeReducer: themeSlice.reducer,
        userReducer : userSlice.reducer,
    }
});

export default store;