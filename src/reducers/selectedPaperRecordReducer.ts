import {SET_SELECTED_PAPER_RECORD} from "../actions/types";
import PaperRecord from "../interfaces/PaperRecord";

const initialState: PaperRecord | null = null;

export default function selectedPaperRecordReducer(state = initialState, action: any): PaperRecord | null {
    switch (action.type) {
        case SET_SELECTED_PAPER_RECORD:
            return action.payload;
        default:
            return state;
    }
}
