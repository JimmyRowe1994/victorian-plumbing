import { configureStore } from '@reduxjs/toolkit'
import { filtersReducer } from './reducers/filtersReducer'
import { productsReducer } from './reducers/productsReducer'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    products: productsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>