import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../Features/Client/clientSlice";
import designationSlice from "../Features/Designation/designationSlice";

export default configureStore({
  reducer: {
    designation: designationSlice,
    clients: clientSlice,
  },
});
