import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "../slices/userSlice";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, thunk),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
