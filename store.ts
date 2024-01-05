import { configureStore } from '@reduxjs/toolkit'

import navReducer from '@/src/slices/navSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer
  }
})
