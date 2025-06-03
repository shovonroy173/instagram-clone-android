import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        token: null, 
        user: null,
    },
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        logout: (state,action)=>{
            state.user = null;
            state.token = null;
        }
    }
});

export const {setToken, setUser, logout} = authReducer.actions;

export default authReducer.reducer;