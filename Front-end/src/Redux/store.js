import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './reducers/todos_reducer';
import { themeSlice } from './reducers/themeReducer';
import { userSlice } from './reducers/user_reducer';

const store = configureStore({
    reducer: {
        todosReducer : todosSlice.reducer,
        themeReducer: themeSlice.reducer,
        userReducer : userSlice.reducer,
    }
});

export default store;