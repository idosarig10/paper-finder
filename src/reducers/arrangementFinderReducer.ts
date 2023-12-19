import { SET_ARRANGEMENT_FINDER } from "../actions/types";
import ArrangmentFinder from "../interfaces/ArrangementFinder";

const initialState: ArrangmentFinder | null = null;

export default function arrangmentFinderReducer(state = initialState, action: any): ArrangmentFinder | null {
  switch (action.type) {
    case SET_ARRANGEMENT_FINDER:
      return action.payload;
    default:
      return state;
  }
}
