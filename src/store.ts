import {configureStore} from "@reduxjs/toolkit";
import selectedPaperRecordReducer from "./reducers/selectedPaperRecordReducer";
import bookDimensionsReducer from "./reducers/bookDimensionsReducer";
import arrangementFinderLabelReducer from "./reducers/arrangementFinderLabelReducer";
import printSettingsReducer from "./reducers/printSettingsReducer";
import pricePerSheetReducer from "./reducers/pricePerSheetReducer";

const store = configureStore({
    reducer: {
        selectedPaperRecord: selectedPaperRecordReducer,
        bookDimensions: bookDimensionsReducer,
        arrangementFinderLabel: arrangementFinderLabelReducer,
        printSettings: printSettingsReducer,
        pricePerSheet: pricePerSheetReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
