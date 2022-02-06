import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
    address : null,
    balance : 0,
    loading: false,
    nfts:[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        walletLogin : (state,action) =>{
            state.loggedIn = true;
            state.loading = false;
            state.address = action.payload;
            localStorage.setItem("addr",action.payload);
        },
        updateBalance : (state,action) => {
            state.balance = action.payload;
        },
        setLoading : (state) => {
            state.loading = true;
        },
        unsetLoading : (state) => {
            state.loading = false;
        },
        loadNFTs : (state,action) => {
            state.nfts = action.payload
        }
    }
})

export const {walletLogin, updateBalance, setLoading, unsetLoading, loadNFTs} = userSlice.actions;

export default userSlice.reducer;