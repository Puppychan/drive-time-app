import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  timeTravel: null,
  isRideSelectionVisible: true,
  isLoading: false,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },

    setTimeTravel: (state, action) => {
      state.timeTravel = action.payload;
    },

    toggleRideSelectionVisibility: (state) => {
      state.isRideSelectionVisible = !state.isRideSelectionVisible;
    },

    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    }
  },
});

export const { setOrigin, setDestination, setTimeTravel, toggleRideSelectionVisibility, toggleLoading } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTimeTravel = (state) => state.nav.timeTravel;
export const selectIsRideSelectionVisible = (state) => state.nav.isRideSelectionVisible;
export const selectIsLoading = (state) => state.nav.isLoading;

export default navSlice.reducer;
