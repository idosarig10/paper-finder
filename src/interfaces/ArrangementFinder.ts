import Dimensions from "./Dimensions";

export default interface ArrangmentFinder {
  (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>>;
}
