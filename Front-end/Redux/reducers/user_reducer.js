import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    _id: null,
};

export const authenticateUser = createAsyncThunk(
    'user/authenticate',
    async (user, thunkAPI) =>{
        const result = await fetch(`http://localhost:5000/login?username=${user.username}&password=${user.password}`,{method:"POST"});
        const data = await result.json()
        return data //should be user object {id:"", username:""}
    }
)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser : (state,action) => {
            const user = authenticate(action.payload);
  
            state.username = user.username;
            state._id = user.id
        },
    },
    extraReducers: {
        [authenticateUser.fulfilled] : (state,action) =>{
            const user = action.payload;
            state.username = user.username;
            state._id = user.id;
        }
    }
})


export  const { getUser } = userSlice.actions;