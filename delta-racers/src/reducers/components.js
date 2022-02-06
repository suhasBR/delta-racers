import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    monocoque: [],
    engine: [],
    wheels: [],
    drivers: [],
    loading: false
}

export const componentSlice = createSlice({
    name:'component',
    initialState,
    reducers:{
        addMonocoque : (state,action) => {
            state.monocoque = action.payload.filteredNFTs;
        },
        addEngine : (state,action) => {
            state.engine = action.payload.filteredNFTs;
        },
        addWheels : (state,action) => {
            state.wheels = action.payload.filteredNFTs;
        },
        addDrivers : (state,action) => {
            state.drivers = action.payload.filteredNFTs;
        },
        enableLoading : (state,action) => {
            state.loading = true
        }
        
    }
})

export const {addMonocoque, addWheels, addEngine, addDrivers, enableLoading} = componentSlice.actions;

export default componentSlice.reducer;