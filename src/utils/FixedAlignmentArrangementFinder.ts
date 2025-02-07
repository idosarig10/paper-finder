import Dimensions from "../interfaces/Dimensions";

const findArrangement = (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>> => {
    const maxNormalAlignmentFitByWidth = Math.floor(paperDimensions.width / bookDimensions.width);
    const maxNormalAlignmentFitByHeight = Math.floor(paperDimensions.height / bookDimensions.height);
    const maxNormalAlignmentFit = maxNormalAlignmentFitByWidth * maxNormalAlignmentFitByHeight;

    const maxRotatedAlignmentFitByWidth = Math.floor(paperDimensions.width / bookDimensions.height);
    const maxRotatedAlignmentFitByHeight = Math.floor(paperDimensions.height / bookDimensions.width);
    const maxRotatedAlignmentFit = maxRotatedAlignmentFitByWidth * maxRotatedAlignmentFitByHeight;

    const bookIsRotated = maxNormalAlignmentFit < maxRotatedAlignmentFit;
    const maxBooksFit = bookIsRotated ? maxRotatedAlignmentFit : maxNormalAlignmentFit;

    return [Array(maxBooksFit).fill(bookIsRotated)];
};

export default findArrangement;
