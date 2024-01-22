import { BookingStatus } from '@/lib/models/booking.model'
import { createSlice } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'

const initialState = {
  bookingId: '',
  customerIdList: [''],
  driverId: '',
  preScheduleTime: null,
  price: 0,
  discountPrice: 0,
  voucherId: '',
  departure: '',
  destinationList: [''],
  status: BookingStatus.Finding,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now()
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setInitial: (state, action) => {
      state.customerIdList = [action.payload]
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload
    },

    setPrice: (state, action) => {
      state.price = action.payload
    },

    setDiscountPrice: (state, action) => {

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
