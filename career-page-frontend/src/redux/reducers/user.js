import {createSelector, createSlice} from '@reduxjs/toolkit';
import {userSliceApi} from '../api/userApi';

export const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        isAuthenticated:false,
    },
    reducers:{
        authenticate:(state,action)=>{
            return {
                ...state,
                user:action.payload.data.user,
                isAuthenticated:true,
            }  
        },
        unAuthenticate:(state,action)=>{
            return{
                ...state,
                user:null,
                isAuthenticated:false
            }
        }
    }
})

export const {authenticate,unAuthenticate}=userSlice.actions;


export default userSlice.reducer;