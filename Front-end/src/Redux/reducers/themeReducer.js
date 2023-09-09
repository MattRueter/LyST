import { createSlice } from "@reduxjs/toolkit";
import  themeSelector  from "../../CSS/muiStyles";

const initialState ={
    theme :{
        primary:{
            backgroundColor: "white",
            color:"black",
        },
        labels:{
            color:"#40a0c0"
        },
    }    
};


export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        changeTheme: (state,action) => {
            const newTheme = action.payload;
            const root = document.documentElement;
            root.className = newTheme;
            
            const theme = themeSelector(newTheme);

            state.theme = theme
        },
    }
});

export const { changeTheme } = themeSlice.actions;
