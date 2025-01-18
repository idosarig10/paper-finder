import Dimensions from "../interfaces/Dimensions";
import FixedAllignmentArrangementFinder from "./FixedAlignmentArrangementFinder";
import {maxBy, range, size, sumBy} from "lodash-es";

const findArrangement = (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>> => {
    const arrangements = range(0, paperDimensions.height / bookDimensions.height).map((i) => {
        return [
            Array(i * Math.floor(paperDimensions.width / bookDimensions.width)).fill(false),
            ...FixedAllignmentArrangementFinder(
                {width: paperDimensions.width, height: paperDimensions.height - bookDimensions.height * i},
                bookDimensions
            ),
        ];
    });

    return maxBy(arrangements, (arrangement) => sumBy(arrangement, size)) ?? [[]];
};

export default findArrangement;
