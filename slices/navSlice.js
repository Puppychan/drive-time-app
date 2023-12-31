import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    timeTravel: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {  // <-- Corrected property name
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },

        setDestination: (state, action) => {
            state.destination = action.payload;
        },

        setTimeTravel: (state, action) => {
            state.timeTravel = action.payload;
        },
    }
})

export const { setOrigin, setDestination, setTimeTravel } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTimeTravel = (state) => state.nav.timeTravel;

export default navSlice.reducer;
