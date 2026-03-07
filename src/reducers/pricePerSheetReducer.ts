import {SET_PRICE_PER_SHEET} from "../actions/types";

const initialState: number | null = null;

export default function pricePerSheetReducer(state = initialState, action: any): number | null {
    switch (action.type) {
        case SET_PRICE_PER_SHEET:
            return action.payload;
        default:
            return state;
    }
}
