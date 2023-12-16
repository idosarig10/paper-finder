import Dimensions from "./Dimensions";

export default interface PaperRecord {
  paperDimensions: Dimensions;
  booksArrangementInPaper: Array<boolean>;
}
