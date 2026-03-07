import ArrangementFinder from "../interfaces/ArrangementFinder";
import PrintSettings from "../interfaces/PrintSettings";
import Dimensions from "../interfaces/Dimensions";

export default function createMarginAwareArrangementFinder(
    finder: ArrangementFinder,
    printSettings: PrintSettings
): ArrangementFinder {
    return (paperDimensions: Dimensions, bookDimensions: Dimensions) => {
        const effectivePaper: Dimensions = {
            width: paperDimensions.width - printSettings.margins.left - printSettings.margins.right,
            height: paperDimensions.height - printSettings.margins.top - printSettings.margins.bottom,
        };
        const effectiveBook: Dimensions = {
            width: bookDimensions.width + printSettings.trimSpacing,
            height: bookDimensions.height + printSettings.trimSpacing,
        };

        if (effectivePaper.width <= 0 || effectivePaper.height <= 0) {
            return [[]];
        }
        if (effectiveBook.width <= 0 || effectiveBook.height <= 0) {
            return [[]];
        }

        return finder(effectivePaper, effectiveBook);
    };
}
