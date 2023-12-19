import { SET_BOOK_DIMENSIONS } from "../actions/types";
import Dimensions from "../interfaces/Dimensions";

const initialState: Dimensions | null = null;

export default function bookDimensionsReducer(state = initialState, action: any): Dimensions | null {
  switch (action.type) {
    case SET_BOOK_DIMENSIONS:
      return action.payload;
    default:
      return state;
  }
}
