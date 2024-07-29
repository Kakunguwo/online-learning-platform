import persistStore from 'redux-persist/es/persistStore';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({user: userReducer});

const persistConfig = {
    key : 'root',
    storage,
    version : 1,
}

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)