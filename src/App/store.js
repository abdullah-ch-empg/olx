import { configureStore } from "@reduxjs/toolkit";
// import clientSlice from "../Features/Client/clientSlice";
import userSlice from "../Features/User/userSlice";
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
// import designationSlice from "../Features/Designation/designationSlice";
// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    // designation: designationSlice,
    // clients: clientSlice,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// purge
// current API call
// log out on 401 (purge)

export const persistor = persistStore(store);
