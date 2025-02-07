import {SET_ARRANGEMENT_FINDER_LABEL, SET_BOOK_DIMENSIONS, SET_SELECTED_PAPER_RECORD} from "./types";
import Dimensions from "../interfaces/Dimensions";
import PaperRecord from "../interfaces/PaperRecord";

export function setSelectedPaperRecord(newSelectedPaperRecord: PaperRecord) {
    return {type: SET_SELECTED_PAPER_RECORD, payload: newSelectedPaperRecord};
}

export function setBookDimensions(newBookDimensions: Dimensions) {
    return {type: SET_BOOK_DIMENSIONS, payload: newBookDimensions};
}

export function setArrangementFinder(newArrangementFinderLabel: string) {
    return {type: SET_ARRANGEMENT_FINDER_LABEL, payload: newArrangementFinderLabel};
}
