import Dimensions from "../interfaces/Dimensions";
import FixedAllignmentArrangementFinder from "./FixedAlignmentArrangementFinder";
import _ from "lodash";

const findArrangement = (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>> => {
  const arrangements = _.range(0, paperDimensions.height / bookDimensions.height).map((i) => {
    return [
      Array(i * Math.floor(paperDimensions.width / bookDimensions.width)).fill(false),
      ...FixedAllignmentArrangementFinder(
        { width: paperDimensions.width, height: paperDimensions.height - bookDimensions.height * i },
        bookDimensions
      ),
    ];
  });

  return _.maxBy(arrangements, (arrangement) => _.sumBy(arrangement, _.size)) ?? [[]];
};

export default findArrangement;
