import { configureStore } from "@reduxjs/toolkit";
import selectedPaperRecordReducer from "./reducers/selectedPaperRecordReducer";
import bookDimensionsReducer from "./reducers/bookDimensionsReducer";
import arrangementFinderLabelReducer from "./reducers/arrangementFinderLabelReducer";

const store = configureStore({
  reducer: {
    selectedPaperRecord: selectedPaperRecordReducer,
    bookDimensions: bookDimensionsReducer,
    arrangementFinderLabel: arrangementFinderLabelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
