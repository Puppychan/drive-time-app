import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocationObject } from 'expo-location';

// Define a type for the slice state
interface NavState {
  currentLocation: LocationObject | null;
  origin: any // Define the type for origin
  destination: any // Define the type for destination
  timeTravel: any // Define the type for timeTravel
  isRideSelectionVisible: boolean
  isLoading: boolean
}

const initialState = {
  currentLocation: null,
  origin: null,
  destination: null,
  timeTravel: null,
  isRideSelectionVisible: true,
  isLoading: false
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  
    setOrigin: (state, action) => {
      state.origin = action.payload
    },

    setDestination: (state, action) => {
      state.destination = action.payload
    },

    setTimeTravel: (state, action) => {
      state.timeTravel = action.payload
    },

    toggleRideSelectionVisibility: (state) => {
      state.isRideSelectionVisible = !state.isRideSelectionVisible
    },

    toggleLoading: (state) => {
      state.isLoading = !state.isLoading
    }
  }
})

export const {
  setCurrentLocation,
  setOrigin,
  setDestination,
  setTimeTravel,
  toggleRideSelectionVisibility,
  toggleLoading
} = navSlice.actions

export const selectCurrentLocation = (state: { nav: NavState }) => state.nav.currentLocation
export const selectOrigin = (state: { nav: NavState }) => state.nav.origin
export const selectDestination = (state: { nav: NavState }) => state.nav.destination
export const selectTimeTravel = (state: { nav: NavState }) => state.nav.timeTravel
export const selectIsRideSelectionVisible = (state: { nav: NavState }) =>
  state.nav.isRideSelectionVisible
export const selectIsLoading = (state: { nav: NavState }) => state.nav.isLoading

export default navSlice.reducer
