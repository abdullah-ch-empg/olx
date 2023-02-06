import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../Features/Client/clientSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import designationSlice from "../Features/Designation/designationSlice";
// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, designationSlice);

export const store = configureStore({
  reducer: {
    // designation: designationSlice,
    clients: clientSlice,
    designation: persistedReducer,
    // middleware: [thunk],
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
