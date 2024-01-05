import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface NavState {
  origin: any // Define the type for origin
  destination: any // Define the type for destination
  timeTravel: any // Define the type for timeTravel
  isRideSelectionVisible: boolean
  isLoading: boolean
}

const initialState = {
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
  setOrigin,
  setDestination,
  setTimeTravel,
  toggleRideSelectionVisibility,
  toggleLoading
} = navSlice.actions

export const selectOrigin = (state: { nav: NavState }) => state.nav.origin
export const selectDestination = (state: { nav: NavState }) => state.nav.destination
export const selectTimeTravel = (state: { nav: NavState }) => state.nav.timeTravel
export const selectIsRideSelectionVisible = (state: { nav: NavState }) =>
  state.nav.isRideSelectionVisible
export const selectIsLoading = (state: { nav: NavState }) => state.nav.isLoading

export default navSlice.reducer
