import { SET_ARRANGEMENT_FINDER_LABEL } from "../actions/types";

const initialState: string | null = null;

export default function arrangmentFinderLabelReducer(state = initialState, action: any): string | null {
  switch (action.type) {
    case SET_ARRANGEMENT_FINDER_LABEL:
      return action.payload;
    default:
      return state;
  }
}
