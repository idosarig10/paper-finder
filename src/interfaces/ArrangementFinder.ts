import Dimensions from "./Dimensions";

export default interface ArrangementFinder {
    (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>>;
}
