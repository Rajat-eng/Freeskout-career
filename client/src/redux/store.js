import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import {emptySplitApi} from './api/index';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    user:userReducer
  },
  devTools:true,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: false}).concat([emptySplitApi.middleware]),
})

setupListeners(store.dispatch)

export default store;