import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './redux/reducer';

export const store = configureStore({
  reducer: {
    data: reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>