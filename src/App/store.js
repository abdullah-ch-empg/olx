import { configureStore } from "@reduxjs/toolkit";
import designationSlice from "../Features/Designation/designationSlice";

export default configureStore({
  reducer: {
    designation: designationSlice,
  },
});
