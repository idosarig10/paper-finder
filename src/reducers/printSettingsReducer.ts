import {SET_PRINT_SETTINGS} from "../actions/types";
import PrintSettings from "../interfaces/PrintSettings";

const initialState: PrintSettings = {
    margins: {top: 0, bottom: 0, left: 0, right: 0},
    trimSpacing: 0,
};

export default function printSettingsReducer(state = initialState, action: any): PrintSettings {
    switch (action.type) {
        case SET_PRINT_SETTINGS:
            return action.payload;
        default:
            return state;
    }
}
