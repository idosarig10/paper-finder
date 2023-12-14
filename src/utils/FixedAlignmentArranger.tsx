
const calculate = (paperWidth: number, paperHeight: number, bookWidth: number, bookHeight: number) => {
  const maxNormalAlignmentFitByWidth = Math.floor(paperWidth / bookWidth);
  const maxNormalAlignmentFitByHeight = Math.floor(paperHeight / bookHeight);
  const maxNormalAlignmentFit = maxNormalAlignmentFitByWidth * maxNormalAlignmentFitByHeight;

  const maxRotatedAlignmentFitByWidth = Math.floor(paperWidth / bookHeight);
  const maxRotatedAlignmentFitByHeight = Math.floor(paperHeight / bookWidth);
  const maxRotatedAlignmentFit = maxRotatedAlignmentFitByWidth * maxRotatedAlignmentFitByHeight;

  const bookIsRotated = maxNormalAlignmentFit < maxRotatedAlignmentFit;
  const maxBooksFit = bookIsRotated ? maxRotatedAlignmentFit : maxNormalAlignmentFit;
  return Array(maxBooksFit).fill(bookIsRotated);
};

export default calculate;