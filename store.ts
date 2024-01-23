import { configureStore } from '@reduxjs/toolkit'

import navReducer from '@/src/slices/navSlice'
import bookingReducer from '@/src/slices/bookingSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    booking: bookingReducer
  }
})
