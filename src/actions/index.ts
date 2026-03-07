import {SET_ARRANGEMENT_FINDER_LABEL, SET_BOOK_DIMENSIONS, SET_PRICE_PER_SHEET, SET_PRINT_SETTINGS, SET_SELECTED_PAPER_RECORD} from "./types";
import Dimensions from "../interfaces/Dimensions";
import PaperRecord from "../interfaces/PaperRecord";
import PrintSettings from "../interfaces/PrintSettings";

export function setSelectedPaperRecord(newSelectedPaperRecord: PaperRecord) {
    return {type: SET_SELECTED_PAPER_RECORD, payload: newSelectedPaperRecord};
}

export function setBookDimensions(newBookDimensions: Dimensions) {
    return {type: SET_BOOK_DIMENSIONS, payload: newBookDimensions};
}

export function setArrangementFinder(newArrangementFinderLabel: string) {
    return {type: SET_ARRANGEMENT_FINDER_LABEL, payload: newArrangementFinderLabel};
}

export function setPrintSettings(newPrintSettings: PrintSettings) {
    return {type: SET_PRINT_SETTINGS, payload: newPrintSettings};
}

export function setPricePerSheet(newPricePerSheet: number | null) {
    return {type: SET_PRICE_PER_SHEET, payload: newPricePerSheet};
}
