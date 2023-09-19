import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    _id: null,
    secret: null
};

export const authenticateUser = createAsyncThunk(
    'user/authenticate',
    async (user, thunkAPI) =>{
        const result = await fetch(`http://localhost:5000/login?username=${user.username}&password=${user.password}`,{method:"POST"});
        const data = await result.json()
        return data 
    }
)

export const signupUser = createAsyncThunk(
    'user/signup',
    async(user, thunkAPI) =>{
        const result = await fetch(`http://localhost:5000/login/signup`, {
            method:"POST",
            headers:{
                "Content-type" :"application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await result.json()
        return data
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async() =>{
        const result = await fetch(`http://localhost:5000/login/logout`)
        const data = await result.json()
        return data
    }

)

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [authenticateUser.fulfilled] : (state,action) =>{
            const user = action.payload;
            state.username = user.username;
            state._id = user.id;
            state.secret = user.secret;
        },
        [signupUser.fulfilled] : (state,action) =>{
            const newUser = action.payload
            state.username = newUser.username;
            state._id = newUser.id;
            state.secret = newUser.secret;
        },
        [logout.fulfilled] : (state, action) =>{
            state.username = null;
            state._id = null;
            state.secret =null;
        }
    }
})