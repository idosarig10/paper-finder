import { configureStore } from "@reduxjs/toolkit";
import selectedPaperRecordReducer from "./reducers/selectedPaperRecordReducer";
import bookDimensionsReducer from "./reducers/bookDimensionsReducer";
import arrangementFinderReducer from "./reducers/arrangementFinderReducer";

const store = configureStore({
  reducer: {
    selectedPaperRecord: selectedPaperRecordReducer,
    bookDimensions: bookDimensionsReducer,
    arrangementFinder: arrangementFinderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
